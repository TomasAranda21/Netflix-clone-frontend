import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import Input from '../../components/Inputs/Input'
import Button from '../../components/button/Button'
import useAuth from '../../hooks/useAuth'
import axios from '../../config/Axios'
import Alert from '../../components/Alerts/Alert'
import AlertLogin from '../../components/Alerts/AlertLogin'

const LoginTwo = () => {

    const {setAuth, exp_reg} = useAuth()
    const navigate = useNavigate()
    const [alert, setAlert ] = useState({});
    
    const {email_exp} = exp_reg
    
    return (
        <> 
                <div className="mx-auto flex justify-center mb-14">

                    <div className="md:px-16 lg:pb-10 lg:w-1/3 pt-14 color_form_login px-7 py-10">
                        <h2 className="text-3xl font-bold text-gray-100 mb-10  text-center md:text-left">Inicio de sesión</h2>
                        <Formik
                        initialValues={{
                            email: "prueba@prueba.com",
                            
                        }}

                        validate={({email}) =>{
                            let errors = {}

                            if(!email){
                                errors.email = 'Ingresa un email válido.'
                            }else if(!email_exp.test(email)){
                                errors.email = 'Ingresa un email válido.'

                            }

                            return errors
                        }}

                        onSubmit={async values => {

                            const {email} = values

                            const password = `${import.meta.env.VITE_PASSWORD}`

                            const valuesLogin = {email, password}
                            
                            try {
      
                                const {data} = await axios.post('/login', valuesLogin)
                            
                                localStorage.setItem('t00321oxpanetflix012x', data.token)
                                
                                
                                await setAuth(data)
                                
                                navigate('/browse')

                                
                            } catch (error) {
                                
                                setAlert({
                                    msg: error.response.data.msg,
                                    error: true
                                  })
                                
                            }

                        }}
                        
                        >{({values, errors, touched, handleChange, handleSubmit, handleBlur}) => (
                            
                            <form action="" className="flex flex-col gap-2 " onSubmit={handleSubmit}>
                                    {alert.msg && <AlertLogin text={alert.msg} error={alert.error}/>}

                                        <div className="flex flex-col gap-20">

                                                <Input
                                                touched={ touched.email}
                                                error={errors.email}
                                                label={"Email"}

                                                htmlFor={'email'}

                                                type='email'
                                                name="email"
                                                onChange={handleChange}
                                                value={values.email}
                                                onBlur={handleBlur}
                                                />

                                                <div className="mt-2">
                                                    {errors.email && touched.email && <Alert error={errors.email}/>}

                                                </div>
                                                
                                        </div>


                                    <Button 
                                        type = 'submit' 
                                        texto={'Iniciar Sesión'}
                                        clases='mt-4 md:mt-10'
                                        >
                                    </Button>

                            </form>

                        )}
                        </Formik>
                        
                        <div className="text-gray-400 md:text-lg mt-4 text-center">
                            <h3 className="mb-2">¿Primera vez en Netflix? <Link className="text-white  hover:underline " to='/signup-user'>Suscríbete ahora.</Link></h3>
                            <h3 className="mb-10">¿Olvidaste tu contraseña? <Link className="text-white  hover:underline " to='/loginHelp'>Recuperar ahora.</Link></h3>
                        </div>

                    </div>
                </div>

    </>
  )
}

export default LoginTwo