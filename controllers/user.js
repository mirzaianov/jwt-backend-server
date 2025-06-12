import { userStore } from '../utils/userStore.js';

export default function user(req, res) {
  try {
    const data = userStore;

    if (!data || (data && data.length === 0)) {
      return res.status(404).json({ message: 'User data not found' }); // Corrected response message
    }

    const jsonData = Array.from(data).map((user) => ({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
    }));

    // 4. Send a single, consolidated response
    res.json(jsonData);
  } catch (error) {
    console.error('Error processing user data request:', error); // Corrected console error message
    // Generic error for unexpected issues
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
