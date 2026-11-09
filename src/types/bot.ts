/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BlobShape = 
  | 'squircle'   // Tilted Orange Squircle
  | 'cloud'      // Mint Green Cloud Puff
  | 'hexagon'    // Tilted Green Polygon/Hexagon
  | 'teardrop'   // Brown Waterdrop
  | 'starburst'  // Hot Pink Starburst Splat
  | 'clover'     // Electric Blue 4-Bubble Clover
  | 'starfish'   // Chubby 5-Arm Starfish
  | 'tri_bread'  // Soft Rounded Triangle Bread / Onigiri
  | 'rocket'     // Sleek Rocket Nose Cone & Fins
  | 'heart'      // Chubby Plump Heart
  | 'star5'      // Chubby 5-Pointed Star
  | 'apple'      // Apple with notch, stem & leaf
  | 'pebble'     // Organic smooth pebble
  | 'capsule';   // Rounded bean capsule

export type MicroExpression = 
  | 'normal'     // Signature parallel slanted slits //
  | 'happy'      // Cute arched eyes ^^
  | 'wink'       // Playful wink ^/
  | 'curious'    // Inquisitive /' with one eye raised
  | 'shocked'    // Dilated rounded slots OO
  | 'sleepy'     // Drooping horizontal slits --
  | 'suspicious' // Narrowed flat gaze
  | 'hearts'     // Loving heart eyes ♥♥
  | 'dizzy';     // Swirly / \ cross-slanted eyes

export type CanvasBackground = 'tech_grid' | 'hud_radar' | 'dot_matrix' | 'oled_black';

export interface BotConfig {
  id: string;
  name: string;
  tagline: string;
  
  // Body geometry & styling
  shape: BlobShape;
  bodyColor: string;
  bodyRotation: number;    // -30 to 30 deg (default 0 deg)
  shadingStyle: 'flat' | 'subtle_bevel' | 'soft_gradient' | 'inner_glow';
  
  // Eyes & Slanted Slits styling
  eyeColor: string;
  eyeSlant: number;        // -45 to 45 deg (default ~24 deg)
  eyeSpacing: number;      // distance between eyes (24 to 56 px)
  eyeWidth: number;        // width/thickness of slit (6 to 18 px)
  eyeHeight: number;       // length of slit (18 to 46 px)
  eyeRoundness: number;    // corner radius of eye pill (2 to 12 px)
  eyeTrackingSensitivity: number; // 0.2 to 2.0
  
  // Physics & Animation
  expression: MicroExpression;
  squashFactor: number;    // 0 to 0.4
  floatAmplitude: number;  // 0 to 14 px
  floatSpeed: number;      // 1.5 to 5.0 s
  blinkCadence: number;    // 2.0 to 6.0 s
  
  // Interactive action triggers
  currentAction?: 'jiggle' | 'bounce' | 'nod' | 'shiver' | 'spin';
  speechBubble?: string;
}
