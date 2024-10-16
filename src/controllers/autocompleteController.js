export const autocomplete = async (req, res) => {
  const { input } = req.query;
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
      params: {
        input: input,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};