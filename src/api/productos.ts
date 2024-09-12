const API = 'http://localhost:8080'

interface Producto{
    nombre: string,
    empresa: string,
    cantidad: number,
    precio: number
}

export const CreateProductRequest = (productos:    {nombre: string,
    empresa: string,
    cantidad: number,
    precio: number }) => 
    fetch(`${API}/productos`,
        {
            method: 'POST',
            body: JSON.stringify(productos),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

export const getProductRequest = () => fetch(`${API}/productos`)

export const updateProductRequest = (productos:    {nombre: string,
    empresa: string,
    cantidad: number,
    precio: number }, id:number) => 
    fetch(`${API}/productos/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(productos),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )


    export const deleteProductRequest = (id: number) => fetch(`${API}/productos/${id}`,{
        method: 'DELETE',
    })

