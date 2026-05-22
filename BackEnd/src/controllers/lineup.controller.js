// lineup.controller.js

exports.generateLineup = async (req, res) => {
  const { matchId, strategy } = req.body;

  if (!matchId || !strategy) {
    return res.status(400).json({ error: 'matchId and strategy are required.' });
  }

  // TODO: Implement actual AI/ML lineup prediction algorithm once data sources are connected
  const mockLineup = [
    { name: 'Virat Kohli', role: 'Batter', formIndex: 9.8, pointsProjected: 98 },
    { name: 'KL Rahul', role: 'Wicket-Keeper', formIndex: 8.9, pointsProjected: 87 },
    { name: 'Hardik Pandya', role: 'All-Rounder', formIndex: 9.4, pointsProjected: 92 },
    { name: 'Jasprit Bumrah', role: 'Bowler', formIndex: 9.9, pointsProjected: 104 }
  ];

  return res.status(200).json({
    message: 'Lineup generated successfully.',
    matchId,
    strategy,
    players: mockLineup,
    createdAt: new Date().toISOString()
  });
};

exports.getHistory = async (req, res) => {
  // TODO: Fetch user's generated lineups from database
  const mockHistory = [
    {
      lineupId: 'mock-lineup-1',
      matchId: 'IND-vs-AUS-2026',
      strategy: 'Balanced',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    }
  ];

  return res.status(200).json({
    message: 'Lineup history retrieved.',
    history: mockHistory
  });
};
