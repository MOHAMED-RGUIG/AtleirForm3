import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDem } from '../actions/pceActions';
import AddPiecePopup from '../components/AddPiecePopup';

function Pcescreen() {
    const [_idDem, set_idDem] = useState('');
    const [clt, setclt] = useState('');
    const [Designt, setDesignt] = useState('');
    const [NSerie, setNSerie] = useState('');
    const [pieces, setPieces] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('DEM');

    const dispatch = useDispatch();
    const demState = useSelector(state => state.getDemReducer);
    const { data } = demState || { data: [] };

    useEffect(() => {
        dispatch(getDem());
    }, [dispatch]);

    useEffect(() => {
        if (_idDem && data.length > 0) {
            const foundItem = data.find(item => item._idDem === _idDem);
            if (foundItem) {
                setclt(foundItem.Clt);
                setDesignt(foundItem.Designt);
                setNSerie(foundItem.NSerie);
            } else {
                setclt('');
                setDesignt('');
                setNSerie('');
            }
        } else {
            setclt('');
            setDesignt('');
            setNSerie('');
        }
    }, [_idDem, data]);

    const handleAddPiece = (piece) => {
        setPieces([...pieces, piece]);
        setShowPopup(false);
    };

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    const handleDeletePiece = (index) => {
        const newPieces = pieces.filter((_, i) => i !== index);
        setPieces(newPieces);
    };

    const filteredData = data.filter(item => item._idDem.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSearchTermChange = (e) => {
        const value = e.target.value.toUpperCase();
        if (value.startsWith('DEM')) {
            setSearchTerm(value);
        } else {
            setSearchTerm('DEM');
        }
        set_idDem(value);
    };

    const handleSelectChange = (e) => {
        const value = e.target.value;
        set_idDem(value);
    };

    // Effet pour mettre à jour les autres champs lorsque _idDem change
    useEffect(() => {
        if (_idDem && data.length > 0) {
            const foundItem = data.find(item => item._idDem === _idDem);
            if (foundItem) {
                setclt(foundItem.Clt);
                setDesignt(foundItem.Designt);
                setNSerie(foundItem.NSerie);
            } else {
                setclt('');
                setDesignt('');
                setNSerie('');
            }
        } else {
            setclt('');
            setDesignt('');
            setNSerie('');
        }
    }, [_idDem, data]);

    return (
        <div>
            <div className='row justify-content-center'> 
                <div className="position-relative">
                    <img src="../black-coffee-surrounded-by-coffee-beans.webp" alt="Lavazza" className="img-fluid w-100 col-11 col-md-11" style={{height:'350px'}} />
                </div>  
                <div className='col-md-11 col-11 text-start shadow-lg p-3 mb-5 mt-3 bg-body rounded'>
                    <div>
                        <input 
                            required 
                            type='text' 
                            placeholder='Recherche par n° de la demande service' 
                            className='form-control mb-2'
                            list="demOptions"
                            value={searchTerm} 
                            onChange={handleSearchTermChange}
                        />
                        <datalist id="demOptions">
                            {filteredData.map(item => (
                                <option key={item._idDem} value={item._idDem}>
                                    {item._idDem}
                                </option>
                            ))}
                        </datalist>
                        
                        <input 
                            required 
                            type='text' 
                            placeholder='Code client' 
                            className='form-control'
                            value={clt} 
                            disabled 
                        />
                        <input 
                            required 
                            type='text' 
                            placeholder='Designation Machine' 
                            className='form-control'
                            value={Designt} 
                            disabled 
                        />
                        <input 
                            required 
                            type='text' 
                            placeholder='N° Chassis' 
                            className='form-control'
                            value={NSerie} 
                            disabled 
                        />
                    </div>
                    <div>
                        <h3 className='mx-auto text-center mt-4 my-3 bl'>Pièce et MO réalisé</h3>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-primary mb-2 mt-3' onClick={handleShowPopup}>Ajouter pièce</button>
                        </div>
                        <hr style={{width:'250px',margin:'15px auto'}} />
                        <table className="table">  
                            <thead>
                                <tr>
                                    <th>Article</th>
                                    <th>Designation</th>
                                    <th>Qté</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pieces.length > 0 ? pieces.map((piece, index) => (
                                    <tr key={index}>
                                        <td>{piece.Pmo}</td>
                                        <td>{piece.DesignationPmo}</td>
                                        <td>{piece.quantity}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => handleDeletePiece(index)}>Supprimer</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4">Aucune pièce ajoutée.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {showPopup && <AddPiecePopup onClose={() => setShowPopup(false)} onAddPiece={handleAddPiece} />}
                    <button className='btn btn-dark mt-3 mb-2 col-12 col-md-12'>Valider</button>
                </div>
            </div>
        </div>
    );
}

export default Pcescreen;
