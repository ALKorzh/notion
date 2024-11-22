import axios from 'axios';
import bcrypt from 'bcryptjs';

const API_URL = 'http://localhost:5000';

export const registerUser = async (data) => {
  const checkResponse = await axios.get(`${API_URL}/users`, {
    params: { email: data.email },
  });

  if (checkResponse.data.length > 0) {
    throw new Error('Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const response = await axios.post(`${API_URL}/users`, {
    ...data,
    password: hashedPassword,
  });

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.get(`${API_URL}/users`, {
    params: { email },
  });

  if (response.data.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = response.data[0];

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};
