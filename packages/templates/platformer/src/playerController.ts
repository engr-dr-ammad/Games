/**
 * Player Controller Script
 * Handles player movement, jumping, and camera control
 *
 * Usage in game:
 * - WASD or Arrow keys to move
 * - Space to jump
 * - Mouse to look around (future)
 */

export interface PlayerInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
}

export interface PlayerState {
  velocity: [number, number, number];
  isGrounded: boolean;
  jumpCount: number;
  position: [number, number, number];
  speed: number;
  jumpForce: number;
}

export class PlayerController {
  private input: PlayerInput = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  };

  private state: PlayerState = {
    velocity: [0, 0, 0],
    isGrounded: false,
    jumpCount: 0,
    position: [0, 0, 0],
    speed: 5,
    jumpForce: 5,
  };

  private readonly maxJumps = 1;
  private readonly moveSpeed = 5;
  private readonly jumpForce = 5;
  private readonly groundDrag = 0.98;
  private readonly airDrag = 0.99;
  private groundCheckDistance = 0.1;

  constructor() {
    this.setupInput();
  }

  private setupInput(): void {
    // Keyboard input
    document.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') this.input.forward = true;
      if (key === 's' || key === 'arrowdown') this.input.backward = true;
      if (key === 'a' || key === 'arrowleft') this.input.left = true;
      if (key === 'd' || key === 'arrowright') this.input.right = true;
      if (key === ' ') {
        e.preventDefault();
        this.input.jump = true;
      }
    });

    document.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') this.input.forward = false;
      if (key === 's' || key === 'arrowdown') this.input.backward = false;
      if (key === 'a' || key === 'arrowleft') this.input.left = false;
      if (key === 'd' || key === 'arrowright') this.input.right = false;
      if (key === ' ') this.input.jump = false;
    });
  }

  public update(
    deltaTime: number,
    playerPosition: [number, number, number],
    raycast: (origin: [number, number, number], direction: [number, number, number]) => boolean
  ): [number, number, number] {
    // Update position
    this.state.position = playerPosition;

    // Check if grounded
    const raycastDown: [number, number, number] = [0, -1, 0];
    this.state.isGrounded = raycast(playerPosition, raycastDown);

    // Reset jump count when grounded
    if (this.state.isGrounded) {
      this.state.jumpCount = 0;
    }

    // Handle jumping
    if (this.input.jump && this.state.jumpCount < this.maxJumps) {
      this.state.velocity[1] = this.jumpForce;
      this.state.jumpCount++;
    }

    // Get movement direction based on input
    const moveDir: [number, number, number] = [0, 0, 0];

    if (this.input.forward) {
      moveDir[2] -= 1;
    }
    if (this.input.backward) {
      moveDir[2] += 1;
    }
    if (this.input.left) {
      moveDir[0] -= 1;
    }
    if (this.input.right) {
      moveDir[0] += 1;
    }

    // Normalize and apply movement
    const moveLength = Math.sqrt(moveDir[0] * moveDir[0] + moveDir[2] * moveDir[2]);
    if (moveLength > 0) {
      moveDir[0] /= moveLength;
      moveDir[2] /= moveLength;
    }

    // Apply movement velocity
    this.state.velocity[0] = moveDir[0] * this.moveSpeed;
    this.state.velocity[2] = moveDir[2] * this.moveSpeed;

    // Apply drag
    const drag = this.state.isGrounded ? this.groundDrag : this.airDrag;
    this.state.velocity[0] *= drag;
    this.state.velocity[2] *= drag;

    // Apply gravity
    const gravity = -9.81;
    this.state.velocity[1] += gravity * deltaTime;

    // Update position with velocity
    const newPos: [number, number, number] = [
      this.state.position[0] + this.state.velocity[0] * deltaTime,
      this.state.position[1] + this.state.velocity[1] * deltaTime,
      this.state.position[2] + this.state.velocity[2] * deltaTime,
    ];

    // Fall detection - reset if fell too far
    if (newPos[1] < -50) {
      return [0, 5, 0]; // Reset to spawn point
    }

    return newPos;
  }

  public getState(): PlayerState {
    return { ...this.state };
  }

  public reset(position: [number, number, number]): void {
    this.state.position = position;
    this.state.velocity = [0, 0, 0];
    this.state.jumpCount = 0;
    this.state.isGrounded = false;
  }
}

// Export as script code string for editor
export const PlayerControllerScript = `
-- Player Controller
-- Controls player movement and jumping

local moveSpeed = 5
local jumpForce = 5
local isGrounded = false
local velocity = {x=0, y=0, z=0}

function onUpdate(deltaTime)
  -- Read input
  local forward = input.forward or false
  local backward = input.backward or false
  local left = input.left or false
  local right = input.right or false
  local jump = input.jump or false

  -- Calculate movement direction
  local moveX = 0
  local moveZ = 0

  if forward then moveZ = moveZ - 1 end
  if backward then moveZ = moveZ + 1 end
  if left then moveX = moveX - 1 end
  if right then moveX = moveX + 1 end

  -- Normalize movement
  local moveLen = math.sqrt(moveX*moveX + moveZ*moveZ)
  if moveLen > 0 then
    moveX = moveX / moveLen
    moveZ = moveZ / moveLen
  end

  -- Apply movement velocity
  velocity.x = moveX * moveSpeed
  velocity.z = moveZ * moveSpeed

  -- Handle jumping
  if jump and isGrounded then
    velocity.y = jumpForce
    isGrounded = false
  end

  -- Apply gravity
  velocity.y = velocity.y - 9.81 * deltaTime

  -- Update position
  local pos = this:getPosition()
  pos.x = pos.x + velocity.x * deltaTime
  pos.y = pos.y + velocity.y * deltaTime
  pos.z = pos.z + velocity.z * deltaTime

  -- Fall detection
  if pos.y < -50 then
    pos = {x=0, y=5, z=0}
  end

  this:setPosition(pos.x, pos.y, pos.z)

  -- Ground check
  isGrounded = physics:raycast(pos, {x=0, y=-1, z=0})
end

function onCollision(other)
  print("Collided with " .. other.name)
end
`;
