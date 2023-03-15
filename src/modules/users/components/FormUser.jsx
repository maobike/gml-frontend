import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col, FormGroup, Label, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from 'react-hook-form';
import '../../../assets/font-awesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserService from '../services/UserService'
import CategoryService from '../../../modules/categories/services/CategoryService'
import Swal from 'sweetalert2';

export function FormUser(props) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, resetField, formState: { errors } } = useForm();
    const { toggle, user, refreshList } = props;
    const [title, setTitle] = useState(null);
    const [countries, setCountries] = useState(null);
    const [categories, setCategories] = useState(null);

    // Función para saber si viene a crear o editar el cliente
    useEffect(() => {
        const getTitle = () => {
            if (user) {
                setTitle('Editar Usuario');
                try {
                    setValue("first_name", user.first_name)
                    setValue("last_name", user.last_name)
                    setValue("dni", user.dni)
                    setValue("email", user.email)
                    setValue("address", user.address)
                    setValue("phone", user.phone)
                    setValue("country", user.country)
                    setValue("category_id", user.category_id)
                } catch (error) {
                    console.log(error);
                }
            } else {
                setTitle('Crear Usuario');
            }
        };

        getTitle();
        getCategories();
        getCountries();
    }, []);

    const getCategories = async() => {
        const result = await CategoryService.getCategories();
        setCategories(result.data)
    }

    const getCountries = async() => {
        const result = await UserService.getCountriesUsers();
        setCountries(result.data)
    }

    // Función para enviar a guardar
    const onSubmit = async (data) => {
        try {
            // Crear o editar
            if (user) {
                updateUser(data);
            } else {
                addUser(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Crear cliente
    const addUser = async (data) => {
        const result = await UserService.addUser(data);
        try {
            if (result.data?.userId) {
                setError("dni", "match", "La cédula del usuario ya existe.");
                return false;
            } else {
                if (result.status === 200) {
                    Swal.fire({
                        title: "Usuario creado con éxito",
                        text: result.data.message,
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                } else {
                    swal.fire({
                        title: "Transacción errónea",
                        text: result.data,
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                }
                toggle();
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        } finally {
            refreshList();
        }
    }

    // Actualizar cliente
    const updateUser = async (data) => {
        try {
            const result = await UserService.editUser(user.id, data);
            if (result.status === 200) {
                Swal.fire({
                    title: "Usuario editado con éxito",
                    text: result.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
            } else {
                Swal.fire({
                    title: "Transacción errónea",
                    text: result.data.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Transacción errónea",
                text: "Ocurrió un error, por favor intente de nuevo",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } finally {
            refreshList();
            toggle();
        }
    }

    return (
        <Fragment>
            {loading && (
                <div className="loader-background">
                    <div className="loader">
                        <Loader type="Oval" color="#00BFFF" />
                    </div>
                </div>
            )}
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                <form name="form-list" id="form-list">
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Nombres <span className="input-obligatorio">*</span></Label>
                                <input className="form-control"
                                    type="text"
                                    autoFocus
                                    maxLength="100"
                                    name="first_name"
                                    {...register("first_name", { 
                                        required: true,
                                        minLength: 5,
                                        maxLength: 100,
                                        pattern: /^[a-zA-ZñÑ\s]*$/i 

                                    })}
                                />
                                <div className="text-error">
                                    {errors.first_name?.type === "required" && "Los nombres son requeridos"}
                                    {errors.first_name?.type === "minLength" && "Este campo debe contener mínimo 5 caracteres"}
                                    {errors.first_name?.type === "maxLength" && "Este campo debe contener máximo 100 caracteres"}
                                    {errors.first_name?.type === "pattern" && "Este campo no debe contener números ni caracteres especiales" }

                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Apellidos <span className="input-obligatorio">*</span></Label>
                                <input className="form-control"
                                    type="text"
                                    autoFocus
                                    maxLength="100"
                                    name="last_name"
                                    { ...register("last_name", { 
                                        required: true,
                                        minLength: 5,
                                        maxLength: 100,
                                        pattern: /^[a-zA-ZñÑ\s]*$/i 

                                    })}
                                />
                                <div className="text-error">
                                    {errors.last_name?.type === "required" && "Los apellidos son requeridos"}
                                    {errors.last_name?.type === "minLength" && "Este campo debe contener mínimo 5 caracteres"}
                                    {errors.last_name?.type === "maxLength" && "Este campo debe contener máximo 100 caracteres"}
                                    {errors.last_name?.type === "pattern" && "Este campo no debe contener números ni caracteres especiales" }
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Cédula</Label>
                                <input className="form-control"
                                    type="number"
                                    maxLength="12"
                                    name="prefijo"
                                    { ...register("dni", { 
                                        required: true,
                                        minLength: 7,
                                        maxLength: 10,

                                    })}
                                />
                                <div className="text-error">
                                    {errors.dni?.type === "required" && "La cédula es requerida"}
                                    {errors.dni?.type === "minLength" && "Este campo debe contener mínimo 7 caracteres"}
                                    {errors.dni?.type === "maxLength" && "Este campo debe contener máximo 10 caracteres"}
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Email</Label>
                                <input className="form-control"
                                    type="email"
                                    maxLength="150"
                                    name="sufijo"
                                    { ...register("email", { 
                                        required: true,
                                        pattern: /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i
                                    })}
                                />
                                <div className="text-error">
                                    {errors.email?.type === "required" && "El email es requerido"}
                                    {errors.email?.type === "maxLength" && "Este campo debe contener máximo 150 caracteres"}
                                    {errors.email?.type === "pattern" && "Este campo debe ser un correo valido" }
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>País <span className="input-obligatorio">*</span></Label>
                                <select className="form-control"
                                    name="country" id="country"
                                    {...register("country", {
                                        required: true,
                                    })}
                                >
                                    <option value="">Seleccione país</option>
                                    {countries &&
                                      countries.length > 0 &&
                                      countries.map((dataDet, index) => {
                                        return (
                                          <option
                                            value={dataDet.name.common}
                                            key={index}
                                            selected={ dataDet.name.common === user?.country}
                                          >
                                            {dataDet.name.common}
                                          </option>
                                        );
                                      })}                                </select>
                                <div className="text-error">
                                    {errors.country?.type === "required" && "El país es requerido"}
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Dirección <span className="input-obligatorio">*</span></Label>
                                <input className="form-control"
                                    type="text"
                                    maxLength="180"
                                    name="radicadoActual"
                                    {...register("address", {
                                        required: true, 
                                        maxLength: 180, 
                                    })}
                                />
                                <div className="text-error">
                                    {errors.address?.type === "required" && "La dirección es requerida"}
                                    {errors.address?.type === "maxLength" && "Este campo debe contener máximo 180 caracteres"}
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Teléfono <span className="input-obligatorio">*</span></Label>
                                <input className="form-control"
                                    type="number"
                                    maxLength="10"
                                    name="sufijo"
                                    { ...register("phone", { 
                                        required: true,
                                        maxLength: 10,
                                        pattern: /^[0-9]+$/
                                    })}
                                />
                                <div className="text-error">
                                    {errors.phone?.type === "required" && "El teléfono es requerido"}
                                    {errors.phone?.type === "maxLength" && "Este campo debe contener máximo 10 caracteres"}
                                    {errors.phone?.type === "pattern" && "Este campo debe ser un teléfono valido" }
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label>Categoría <span className="input-obligatorio">*</span></Label>
                                <select className="form-control"
                                    name="category_id"
                                    {...register("category_id", {
                                        required: true,
                                    })}
                                >
                                    <option value="">Seleccione categoría</option>
                                    {categories &&
                                        categories.length > 0 &&
                                        categories.map((dataDet, index) => {
                                            return (
                                                <option
                                                    value={dataDet.id}
                                                    key={index}
                                                    selected={ dataDet.id === user?.category_id}
                                                >
                                                    {dataDet.name}
                                                </option>
                                            );
                                        })
                                    }                                
                                </select>
                                <div className="text-error">
                                    {errors.category_id?.type === "required" && "La categoría es requerida"}
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
                    <FontAwesomeIcon icon="save" /> Guardar
                </Button>
                <Button color="secondary" onClick={toggle}>
                    <FontAwesomeIcon icon="eraser" /> Cancel
                </Button>
            </ModalFooter>
        </Fragment>
    )
}