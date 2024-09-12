import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  CreateProductRequest,
  getProductRequest,
  deleteProductRequest,
  updateProductRequest,
} from "./api/productos";
import { Button, Form, Modal } from "react-bootstrap";

const Tabla = () => {
  
  interface ProductoTicket {
    id: number,
    nombre: string,
    precio: number,
    cantidad: number;
    pos: number,
  }

  interface Producto {
    id: number,
    nombre: string,
    empresa: string,
    precio: number,    
    cantidad: number;

  }


  const [temp, setTemp] = useState<Producto[]>([]);
  const [ticket, setTicket] = useState<ProductoTicket[]>([]);
  
  useEffect(() => {
    getProductRequest()
      .then((response) => response.json())
      .then((data) => setTemp(data));
  }, []);
  const [show, setShow] = useState(false);
  const [showT, setShowT] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseT = () => setShowT(false);

  const defaultProductData = {
    id: 0,
    nombre: "",
    empresa: "",
    cantidad: 0,
    precio: 0,
  };


  const [data, setData] = useState([
    //Data de prueba
    {
      id: 1,
      nombre: "Coca",
      empresa: "Cocacola",
      cantidad: 10,
      precio: 20,
    },
    {
      id: 2,
      nombre: "Pepsicola",
      empresa: "Pepsi",
      cantidad: 10,
      precio: 20,
    },
    {
      id: 3,
      nombre: "Mayonesa",
      empresa: "Helmans",
      cantidad: 10,
      precio: 20,
    },
  ]);

  const [formData, setFormData] = useState(defaultProductData);
  const [props, setProps] = useState(defaultProductData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    debugger
    const value = e.target.value;
    if(!isNaN(+value)){
      if(+value < 99999999)
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
    }

  };

  const handleNumberModule = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(!isNaN(+value)){
      if(+value < 99999999)
      setProps({ ...props, [e.target.name]: e.target.value });
      console.log(props);
    }


  };
  
  const handleModuleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setProps({ ...props, [e.target.name]: e.target.value });
    console.log(props);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.nombre != "" && formData.empresa != "") {
      const newForm = {
        nombre: formData.nombre,
        empresa: formData.empresa,
        cantidad: formData.cantidad,
        precio: formData.precio,
      };

      const res = await CreateProductRequest(newForm);
      console.log(res);
      getProductRequest()
        .then((response) => response.json())
        .then((data) => setTemp(data));
      setFormData(defaultProductData);
    }
  };
  const onSubmitPromps = async (e: FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    if (props.nombre != "" && props.empresa != "") {
      const newForm = {
        nombre: props.nombre,
        empresa: props.empresa,
        cantidad: props.cantidad,
        precio: props.precio,
      };

      const res = await updateProductRequest(newForm, props.id);
      console.log(res);
      getProductRequest()
        .then((response) => response.json())
        .then((data) => setTemp(data));
      setFormData(defaultProductData);
      handleClose();
    }
  };
  const handleDelete = async (id: number) => {
    const res = await deleteProductRequest(id);
    console.log(res);
    getProductRequest()
      .then((response) => response.json())
      .then((data) => setTemp(data));
  };

  function handleShow(p: {
    id: number;
    nombre: string;
    empresa: string;
    cantidad: number;
    precio: number;
  }): void {
    setProps(p);
    console.log(p);
    setShow(true);
  }


  
  return (
    <div className="container">
      <div>
        <form onSubmit={onSubmit} className="formcontainer">
          <div className="inputcontainer">
            <Form.Label className="labels">Nombre producto</Form.Label>
            <Form.Control
              type="string"
              placeholder="Nombre"
              maxLength={34}
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />

            <Form.Label className="labels">Nombre Empresa</Form.Label>
            <Form.Control
              type="string"
              placeholder="Empresa"
              maxLength={34}
              name="empresa"
              value={formData.empresa}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputcontainer">
            <Form.Label className="labels">Cantidad</Form.Label>
            <Form.Control
              type="string"
              placeholder="Cantidad"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleNumberChange}
            />
            <Form.Label className="labels">Precio</Form.Label>
            <Form.Control
              type="string"
              placeholder="Precio"
              name="precio"
              value={formData.precio}
              onChange={handleNumberChange}
            />
          </div>
          <div className="btncontainer">
            <Button className="btn" type="submit">
              AGREGAR PRODUCTO
            </Button>

          </div>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>

          {temp.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.empresa}</td>
              <td>{item.cantidad}</td>
              <td>{item.precio}</td>

              <td className="actions">
                <button className="edit" onClick={() => handleShow(item)}>
                  editar
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  eliminar
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDITAR PRODUCTO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmitPromps}>
            <Form.Label>Nombre producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              maxLength={34}
              name="nombre"
              value={props.nombre}
              onChange={handleModuleChange}
            />
            <Form.Label>Nombre Empresa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Empresa"
              name="empresa"
              maxLength={34}
              value={props.empresa}
              onChange={handleModuleChange}
            />
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="string"
              placeholder="Cantidad"
              name="cantidad"
              value={props.cantidad}
              onChange={handleNumberModule}
            />
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="string"
              step="0.01"
              placeholder="Precio"
              name="precio"
              value={props.precio}
              onChange={handleNumberModule}
            />
            <div className="btnmodule">
            <Button className="btn" type="submit">
              APLICAR CAMBIOS
            </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
     
    </div>
  );
};
export default Tabla;
