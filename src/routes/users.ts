import { Router, Request, Response } from 'express';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from '../data/userStore';

const router = Router();

// GET - Retrieve all users
router.get('/users', (req: Request, res: Response) => {
  const users = getAllUsers();
  res.status(200).json({
    statusCode: 200,
    statusMessage: 'Users retrieved successfully',
    body: { users }
  });
});

// GET - Retrieve a specific user by ID
router.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = getUserById(id);
  
  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      statusMessage: 'User not found',
      body: { error: `User with id ${id} does not exist` }
    });
  }

  res.status(200).json({
    statusCode: 200,
    statusMessage: 'User retrieved successfully',
    body: { user }
  });
});

// POST - Create a new user
router.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      statusCode: 400,
      statusMessage: 'Bad Request - Missing required fields',
      body: { error: 'Name and email are required' }
    });
  }

  const newUser = addUser(name, email);

  res.status(201).json({
    statusCode: 201,
    statusMessage: 'User created successfully',
    body: { user: newUser }
  });
});

// PUT - Update an existing user
router.put('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      statusCode: 400,
      statusMessage: 'Bad Request - Missing required fields',
      body: { error: 'Name and email are required' }
    });
  }

  const updatedUser = updateUser(id, name, email);
  
  if (!updatedUser) {
    return res.status(404).json({
      statusCode: 404,
      statusMessage: 'User not found',
      body: { error: `User with id ${id} does not exist` }
    });
  }

  res.status(200).json({
    statusCode: 200,
    statusMessage: 'User updated successfully',
    body: { user: updatedUser }
  });
});

// DELETE - Remove a user
router.delete('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deletedUser = deleteUser(id);
  
  if (!deletedUser) {
    return res.status(404).json({
      statusCode: 404,
      statusMessage: 'User not found',
      body: { error: `User with id ${id} does not exist` }
    });
  }

  res.status(200).json({
    statusCode: 200,
    statusMessage: 'User deleted successfully',
    body: { deletedUser }
  });
});

export default router;
