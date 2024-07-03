import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPiece } from '../actions/pceActions';

function AddPiecePopup({ onClose, onAddPiece }) {
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();
    const pieceState = useSelector(state => state.getPieceReducer);
    const { loading, error, pieces } = pieceState;

    useEffect(() => {
        dispatch(getPiece());
    }, [dispatch]);

    // Vérifie si pieces est défini, sinon utilise un tableau vide pour éviter l'erreur
    const filteredPieces = pieces ? pieces.filter(piece =>
        piece.Pmo.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const handleAddPiece = () => {
        if (selectedPiece && quantity > 0 && selectedPiece.QtDispPmo > 0 && quantity <= selectedPiece.QtDispPmo) {
            onAddPiece({ ...selectedPiece, quantity });
            onClose();
        } else if (quantity <= 0) {
            alert('La quantité doit être supérieure à zéro.');
        } else if (selectedPiece.QtDispPmo === 0) {
            alert('La quantité disponible est épuisée.');
        } else if (quantity > selectedPiece.QtDispPmo) {
            alert('La quantité sélectionnée dépasse la quantité disponible.');
        } else {
            alert('Veuillez sélectionner une pièce et entrer une quantité valide.');
        }
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2 className='mb-4 text-center'>Ajouter une pièce</h2>
                {loading ? (
                    <p>Chargement...</p>
                ) : error ? (
                    <p>Erreur: {error}</p>
                ) : (
                    <div>
                        <input
                            type="text"
                            placeholder="Rechercher par réference article.."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='form-control mb-2'
                        />
                        <select
                        className='form-control' 
                            value={selectedPiece ? selectedPiece.DesignationPmo : ''}
                            onChange={(e) => {
                                const piece = pieces.find(p => p.DesignationPmo === e.target.value);
                                setSelectedPiece(piece);
                            }}
                        >
                            <option value="" >Sélectionnez une pièce</option>
                            {filteredPieces.map((piece, index) => (
                                <option  key={index} value={piece.DesignationPmo}>
                                    {piece.Pmo} - {piece.DesignationPmo} - Qté disponible: {piece.QtDispPmo}
                                </option>
                            ))}
                        </select>
                        <input
                        className='form-control mb-2'
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            min="1"
                            max={selectedPiece ? selectedPiece.QtDispPmo : 1}
                        />
                        <button
                        className='btn btn-primary mx-2'
                            onClick={handleAddPiece}
                            disabled={!selectedPiece || quantity <= 0 || selectedPiece.QtDispPmo === 0 || quantity > selectedPiece.QtDispPmo}
                        >
                            Ajouter
                        </button>
                        <button onClick={onClose} className='btn btn-outline-primary'>Fermer</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddPiecePopup;
