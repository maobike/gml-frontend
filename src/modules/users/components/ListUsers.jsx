import React, { useState, useEffect } from 'react';
import '../../../assets/font-awesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Row, Col, Table, CardBody, InputGroup, Input, InputGroupText, Modal } from 'reactstrap';

import UserService from './../services/UserService';
import { FormUser } from './FormUser';

export const ListUsers = () => {
    const [dataUser, setDataUser] = useState(null);
    const [dataUserFilter, setDataUserFilter] = useState(null);
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [inputText, setInputText] = useState('');

    // Búsqueda con paginación a BD
    const SearchUser = async (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                // Llamamos el servicio
                const result = await UserService.getUsers();
                // Asignamos el valor del resultado
                setDataUser(result.data);
                setDataUserFilter(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, [refresh]);

    // Búsqueda por correo, nombre, apellido o país
    const handleInputChange = (input) => {
        // limpiar arreglo
        setDataUserFilter(null);
        var newArray = [];
        const { value } = input.target;
        //Cambiar entrada a mayúsculas
        setInputText(value.toUpperCase());

        if (dataUser !== null) {
            dataUser.map((dataUser, index) => {
                if (
                    dataUser?.email.toUpperCase().includes(value.toUpperCase()) ||
                    dataUser?.first_name.toUpperCase().includes(value.toUpperCase()) ||
                    dataUser?.last_name.toUpperCase().includes(value.toUpperCase()) ||
                    dataUser?.country.toUpperCase().includes(value.toUpperCase())
                ) {
                    newArray.push(dataUser);
                    setDataUserFilter(newArray);
                }
                return dataUser;
            });
        }
    };

    const toggle = () => {
        setModal(!modal);
    };

    const refreshList = () => {
        setRefresh(!refresh);
    };

    // Abrir modal crear o editar
    const formUser = (user) => {
        setUser(user);
        toggle('modal');
    };
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardBody>
                            <Col md="12" className="">
                                <Table className="">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <form onSubmit={SearchUser}>
                                                    <Row >
                                                        <Col md={4}>
                                                            <InputGroup className="no-border">
                                                                <Input
                                                                    placeholder="Buscar..."
                                                                    autoComplete="off"
                                                                    name="SearchUser"
                                                                    value={inputText}
                                                                    onChange={handleInputChange}
                                                                />
                                                                <InputGroupText>
                                                                    <FontAwesomeIcon icon="search" />
                                                                </InputGroupText>
                                                                <Button color='primary'  onClick={() => formUser()}>
                                                                    <FontAwesomeIcon icon="plus" /> Nuevo Usuario
                                                                </Button>
                                                            </InputGroup>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div style={{ overflow: 'auto' }}>
                                    <Table hover striped bordered className="borde-tabla">
                                        <thead>
                                            <tr>
                                                <th>Nombres</th>
                                                <th>Apellidos</th>
                                                <th>Cédula</th>
                                                <th>Email</th>
                                                <th>País</th>
                                                <th>Dirección</th>
                                                <th>Celular</th>
                                                <th>Categoría</th>
                                                <th>Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataUserFilter && dataUserFilter.length > 0 && dataUserFilter.map((dataRes, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{dataRes.first_name}</td>
                                                        <td>{dataRes.last_name}</td>
                                                        <td>{dataRes.dni}</td>
                                                        <td>{dataRes.email}</td>
                                                        <td>{dataRes.country}</td>
                                                        <td>{dataRes.address}</td>
                                                        <td>{dataRes.phone}</td>
                                                        <td>{dataRes.category.name}</td>
                                                        <td style={{ textAlign: 'center', alignSelf: 'stretch' }}>
                                                            <Button title="Editar usuario" color="link" onClick={() => formUser(dataRes)}>
                                                                <FontAwesomeIcon icon="edit" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <div>
                <Modal isOpen={modal} toggle={toggle} size="xl">
                    <FormUser toggle={toggle} user={user} refreshList={refreshList}></FormUser>
                </Modal>
            </div>
        </div>
    )
}

