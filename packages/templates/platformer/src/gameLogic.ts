/**
 * Game Logic for Platformer Template
 * Handles score, collisions, win/lose conditions
 */

export interface GameScore {
  coinsCollected: number;
  totalCoins: number;
  timeElapsed: number;
  hasWon: boolean;
}

export class PlatformerGame {
  private score: GameScore = {
    coinsCollected: 0,
    totalCoins: 0,
    timeElapsed: 0,
    hasWon: false,
  };

  private collectedCoins: Set<string> = new Set();
  private spawnPoint: [number, number, number] = [0, 2, 0];
  private goalReached: boolean = false;

  constructor(totalCoins: number = 5) {
    this.score.totalCoins = totalCoins;
  }

  public update(deltaTime: number): void {
    this.score.timeElapsed += deltaTime;
  }

  public onEntityCollision(entity1Id: string, entity2Id: string): void {
    // Player collects coin
    if (this.isPlayer(entity1Id) && this.isCoin(entity2Id)) {
      this.collectCoin(entity2Id);
    } else if (this.isCoin(entity1Id) && this.isPlayer(entity2Id)) {
      this.collectCoin(entity1Id);
    }

    // Player reaches goal
    if (this.isPlayer(entity1Id) && this.isGoal(entity2Id)) {
      this.reachGoal();
    } else if (this.isGoal(entity1Id) && this.isPlayer(entity2Id)) {
      this.reachGoal();
    }
  }

  private isPlayer(id: string): boolean {
    return id === 'player-001';
  }

  private isCoin(id: string): boolean {
    return id.startsWith('coin-');
  }

  private isGoal(id: string): boolean {
    return id === 'goal-001';
  }

  private collectCoin(coinId: string): void {
    if (!this.collectedCoins.has(coinId)) {
      this.collectedCoins.add(coinId);
      this.score.coinsCollected++;
      console.log(`Coin collected! ${this.score.coinsCollected}/${this.score.totalCoins}`);
    }
  }

  private reachGoal(): void {
    if (!this.goalReached) {
      this.goalReached = true;
      this.score.hasWon = true;
      console.log(`Victory! Time: ${this.score.timeElapsed.toFixed(1)}s, Coins: ${this.score.coinsCollected}/${this.score.totalCoins}`);
    }
  }

  public respawnPlayer(): [number, number, number] {
    return this.spawnPoint;
  }

  public getScore(): GameScore {
    return { ...this.score };
  }

  public reset(): void {
    this.score = {
      coinsCollected: 0,
      totalCoins: this.score.totalCoins,
      timeElapsed: 0,
      hasWon: false,
    };
    this.collectedCoins.clear();
    this.goalReached = false;
  }

  public getProgress(): number {
    return (this.score.coinsCollected / this.score.totalCoins) * 100;
  }
}

// Game logic script for embedded use
export const GameLogicScript = `
-- Game Logic Script
-- Manages score, collectibles, and win conditions

local coinsCollected = 0
local totalCoins = 5
local startTime = 0
local hasWon = false

function onGameStart()
  startTime = getTime()
  print("Platformer Game Started!")
  print("Collect all coins and reach the goal!")
end

function onCoinCollected(coinId)
  coinsCollected = coinsCollected + 1
  print("Coin collected! (" .. coinsCollected .. "/" .. totalCoins .. ")")

  if coinsCollected == totalCoins then
    print("All coins collected!")
  end
end

function onGoalReached()
  if not hasWon then
    hasWon = true
    local timeElapsed = getTime() - startTime
    print("Victory! Time: " .. string.format("%.1f", timeElapsed) .. "s")
  end
end

function onPlayerFell()
  print("Fell off the world! Respawning...")
  respawnPlayer()
end

function update(dt)
  -- Update game state
  -- This is called every frame
end
`;
