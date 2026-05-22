// Lineup.js model placeholder

// In a real MongoDB application:
// const mongoose = require('mongoose');
// const lineupSchema = new mongoose.Schema({ ... });
// module.exports = mongoose.model('Lineup', lineupSchema);

class Lineup {
  constructor(userId, matchId, players, strategy) {
    this.userId = userId;
    this.matchId = matchId;
    this.players = players;
    this.strategy = strategy;
    this.createdAt = new Date();
  }
}

module.exports = Lineup;
