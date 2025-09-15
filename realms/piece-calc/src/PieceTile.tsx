import type { Piece } from "./App";

interface PieceTileProps {
  piece: Piece;
  onAttack: (piece: Piece) => void;
  onDelete: (piece: Piece) => void;
}

export default function PieceTile({ piece, onAttack, onDelete }: PieceTileProps) {
  const numUnits = Math.ceil(piece.totalHp / piece.hpu);
  // Define symbols based on type
  const getSymbol = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sword':
        return '🗡️';
      case 'spear':
        return '🔱'; // Using same as sword; adjust if needed
      case 'ranged':
        return '🏹';
      case 'rider':
        return '🐎';
      case 'tank':
        return '💣';
      default:
        return '';
    }
  };

  const symbol = getSymbol(piece.type);

  return (
    <div className="piece-tile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <div>
        <h3 style={{ margin: 0 }}>
          {symbol} {piece.name} {symbol}
        </h3>
        <div>
          <b>Type</b>: {piece.type}<br/>
          <b>HP per Unit</b>: {piece.hpu}<br/>
          <b>DMG per Unit</b>: {piece.dpu}<br/>
          <b>Number of Units</b>: {numUnits}<br/>
          <b>Total HP</b>: {piece.totalHp}<br/>
          <b>Total DMG</b>: {numUnits * piece.dpu}<br/>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <button onClick={() => onAttack(piece)} style={{ fontSize: '12px', padding: '5px' }}>💥 Attack</button>
        <button onClick={() => onDelete(piece)} style={{ fontSize: '12px', padding: '5px' }}>❌ Delete</button>
      </div>
    </div>
  );
}
