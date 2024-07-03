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
        }
    }, [_idDem, data]);

    const handleAddPiece = (piece) => {
        setPieces([...pieces, piece]);
        setShowPopup(false);
    };

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    return (
        <div>
            <div className='row justify-content-center'> 
         
            <div className="position-relative">
    <img src="../black-coffee-surrounded-by-coffee-beans.webp" alt="Lavazza" className="img-fluid w-100 col-11 col-md-11" style={{height:'350px'}} />
  
</div>  

  
                <div className='col-md-11 col-11 text-start shadow-lg p-3 mb-5 mt-3 bg-body rounded'>
                  
                    <div>
                        <input required type='text' placeholder='Entrer le n° de la demande service' className='form-control'
                            value={_idDem} onChange={(e) => { set_idDem(e.target.value) }}
                        />
                        <input required type='text' placeholder='Code client' className='form-control'
                            value={clt} disabled onChange={(e) => { setclt(e.target.value) }}
                        />
                        <input required type='text' placeholder='Designation Machine' className='form-control'
                            value={Designt} disabled onChange={(e) => { setDesignt(e.target.value) }}
                        />
                        <input required type='text' placeholder='N° Chassis' className='form-control'
                            value={NSerie} disabled onChange={(e) => { setNSerie(e.target.value) }}
                        />
                 
                    </div>
                    <div>
                        <h3 className='mx-auto text-center mt-4 my-3 bl'>Pièce et MO réalisé</h3>
                        <input required type='text' placeholder='Sélectionner les pièces changés' className='form-control mb-4'
                            value={pieces.length > 0 ? pieces.map(piece => piece.DesignationPmo).join(', ') : ''}
                            readOnly
                            onClick={handleShowPopup}
                        />
<hr style={{width:'250px',margin:'15px auto'}}></hr>
                        <table className="table">  
                            <thead>
                                <tr>
                                    <th>Article</th>
                                    <th>Designation</th>
                                    <th>Qté</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pieces.length > 0 ? pieces.map((piece, index) => (
                                    <tr key={index}>
                                           <td>{piece.Pmo}</td>
                                        <td>{piece.DesignationPmo}</td>
                                        <td>{piece.quantity}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="2">Aucune pièce ajoutée.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {showPopup && <AddPiecePopup onClose={() => setShowPopup(false)} onAddPiece={handleAddPiece} />}

                    <button className='btn btn-dark mt-3 mb-2 col-12 col-md-12'>Valider </button>
                        <br />

                </div>
            </div>
        </div>
    );
}

export default Pcescreen;
