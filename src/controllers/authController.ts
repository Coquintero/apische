import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../domain/User';
import userService from '../services/userService';

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      username,
      password: hashedPassword
    };

    await userService.createUser(newUser);
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await userService.findUserByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};

export { register, login };
