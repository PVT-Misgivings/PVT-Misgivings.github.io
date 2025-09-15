import { useState } from 'react';
import './App.css'
import PieceTile from './PieceTile';

// #region TYPES
type Unit = {
  type: string;
  hpu: number; // hp per unit
  dpu: number; // dmg per unit
  totalHp: number; // total hp for this piece (hpu * numUnits)
}

export type Piece = Unit & {
  name: string; // name of the piece
  pieceType: string;
}

const units: Unit[] = [
    {type: "sword", hpu: 4, dpu: 2, totalHp: 64},
    {type: "spear", hpu: 3, dpu: 2, totalHp: 48},
    {type: "ranged", hpu: 1, dpu: 1, totalHp: 16},
    {type: "rider", hpu: 12, dpu: 8, totalHp: 48},
    {type: "tank", hpu: 40, dpu: 32, totalHp: 40}
];

// #region APP
function App() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [pieceType, setPieceType] = useState<string>("Swordsman");

  // #region FUNCTIONS
  function addPiece() {
    let newPiece: Piece;
    let baseUnit: Unit;

    if (pieceType == "Swordsman" || pieceType == "Axe Orc"){baseUnit = units[0];} 
    else if (pieceType == "Spearman" || pieceType == "Spear Orc"){baseUnit = units[1];} 
    else if (pieceType == "Archer" || pieceType == "Crossbow Orc"){baseUnit = units[2];} 
    else if (pieceType == "Cavalry" || pieceType == "Wolf rider"){baseUnit = units[3];} 
    else { baseUnit = units[4]; }

    let pieceIndex = pieces.filter(p => p.pieceType === pieceType).length + 1;
    newPiece = { ...baseUnit, name: `${pieceType} ${pieceIndex}`, pieceType };
    setPieces([newPiece, ...pieces]);
  }

  function handleAttack(attackedPiece: Piece) {
    const dmgStr = prompt(`Enter damage done to ${attackedPiece.name} (Total HP: ${attackedPiece.totalHp}):`, "0");
    if (dmgStr === null) return; // User cancelled
    const dmg = parseInt(dmgStr);
    if (isNaN(dmg) || dmg < 0) {
      alert("Please enter a valid non-negative number for damage.");
      return;
    }
    setPieces(pieces.map(p => {
      if (p.name === attackedPiece.name) {
        let newTotalHp = p.totalHp - dmg;
        if (newTotalHp < 0) newTotalHp = 0;
        return {...p, totalHp: newTotalHp};
      } else {
        return p;
        }
    }));
  }

  function handleDelete(deletedPiece: Piece) {
    if (window.confirm(`Are you sure you want to delete ${deletedPiece.name}?`)) {
      setPieces(pieces.filter(p => p.name !== deletedPiece.name));
    }
  }

  return (
    <div className="app">
      <a href='../'>Back</a>
      <h1>A piece calculator and tracker for Realms testing.</h1>
      Instructions:<br/>
      Input your piece type. As damage is done to the piece, input the amount of dmg done, and the computer will update your piece file.<br/>
      <br/>
      <label htmlFor="pieceType">Add piece type:</label>
      <select id="pieceType" onChange={e => setPieceType(e.target.value)}>
        <option disabled>-- Human Units --</option>
        <option value="Swordsman">Swordsman</option>
        <option value="Spearman">Spearman</option>
        <option value="Archer">Archer</option>
        <option value="Cavalry">Cavalry</option>
        <option value="Cannon">Cannon</option>
        <option disabled>-- Orc Units --</option>
        <option value="Axe Orc">Axe Orc</option>
        <option value="Spear Orc">Spear Orc</option>
        <option value="Crossbow Orc">Crossbow Orc</option>
        <option value="Wolf rider">Wolf rider</option>
        <option value="Troll">Troll</option>
      </select>
      <br/><input type="button" value="ADD PIECE" onClick={addPiece}/>
      Active pieces:<br/><br/>
      <div className="pieces-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-start' }}>
        {pieces.map(p => (
          <PieceTile key={p.name} piece={p} onAttack={handleAttack} onDelete={handleDelete} />
        ))}
      </div>
    </div>
      
  )
}

export default App
