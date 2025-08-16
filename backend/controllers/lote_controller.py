from database import session
from models import Lote
from flask import request, jsonify

def consulta_lotes(usuario_id):
    try:
        lotes = (
            session.query(Lote)
            .filter(Lote.usuario_id == usuario_id)
            .all()
        )
        
        lotes_list = [{
            'id': l.id,
            'produto_id': l.produto_id,
            'numero_lote': l.numero_lote,
            'validade': l.validade,
            'quantidade': l.quantidade,
        } for l in lotes]
        
        return jsonify(lotes_list)
    finally:
        session.remove()