const { codifyApiError } = require('../utils')

const errorHandler = (err, req, res, next) => {
  console.log(err)
  if (err._message){
    err = codifyApiError(err)
  }

  res.json({ err })
  return
}

module.exports = errorHandler

/**
 * ----------------- JWTOKEN ---------------
 * "err": {
    "name": "TokenExpiredError",
    "message": "jwt expired",
    "expiredAt": "2021-12-04T15:19:58.000Z",
    "status": 401
  }
  {
  "err": {
    "name": "JsonWebTokenError",
    "message": "invalid token",
    "status": 401
  }
  ------------------- MONGO -----------------
   => Nombre Vacío
  "err": {
        "errors": {
            "nombre": {
                "name": "ValidatorError",
                "message": "Nombre del anuncio requerido",
                "properties": {
                    "message": "Nombre del anuncio requerido",
                    "type": "required",
                    "path": "nombre",
                    "value": ""
                },
                "kind": "required",
                "path": "nombre",
                "value": ""
            }
        },
        "_message": "Ad validation failed",
        "name": "ValidationError",
        "message": "Ad validation failed: nombre: Nombre del anuncio requerido"
    }
    => venta vacío o string que no es TRUE o FALSE
    "err": {
        "errors": {
            "venta": {
                "stringValue": "\"\"",
                "valueType": "string",
                "kind": "Boolean",
                "value": "",
                "path": "venta",
                "reason": {
                    "stringValue": "\"\"",
                    "valueType": "string",
                    "kind": "boolean",
                    "value": "",
                    "name": "CastError",
                    "message": "Cast to boolean failed for value \"\" (type string) at path \"undefined\""
                },
                "name": "CastError",
                "message": "Cast to Boolean failed for value \"\" (type string) at path \"venta\""
            }
        },
        "_message": "Ad validation failed",
        "name": "ValidationError",
        "message": "Ad validation failed: venta: Cast to Boolean failed for value \"\" (type string) at path \"venta\""
    }
 */