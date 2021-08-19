import axios from 'axios';
import { withTokenHeaders } from './token-service';

const ENDPOINT = 'http://localhost:3001/goals';

async function createGoal(goal) {
  try {
    const response = await axios.post(ENDPOINT, goal, withTokenHeaders());

    return { goals: response.data.goals, message: response.data.message };
  } catch(err) {
    return { goals: null, message: err.response?.data?.message };
  }
}

async function getAllGoals() {
  try {
    const response = await axios.get(ENDPOINT, withTokenHeaders());

    return { goals: response.data.goals, message: response.data.message };
  } catch(err) {
    return { goals: null, message: err.response?.data?.message };
  }
}

async function updateGoal(goal) {
  try {
    const response = await axios.put(`${ENDPOINT}/${goal._id}`, goal, withTokenHeaders());

    return { goal: response.data.goal, message: response.data.message };
  } catch(err) {
    return { goal: null, message: err.response?.data?.message };
  }
}

async function deleteGoal(goal) {
  try {
    const response = await axios.delete(`${ENDPOINT}/${goal._id}`, withTokenHeaders());

    return { goals: response.data.goals, message: response.data.message };
  } catch(err) {
    return { goals: null, message: err.response?.data?.message };
  }
}

export {
  createGoal,
  getAllGoals,
  updateGoal,
  deleteGoal,
};
