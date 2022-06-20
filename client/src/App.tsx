/* eslint-disable react/jsx-props-no-spreading *//* eslint-disable prettier/prettier */
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css"

interface IFormInputProps {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
}

function App() {
    const { register, handleSubmit, setValue, setFocus, formState: { errors } } = useForm<IFormInputProps>();

    const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e)
    }


    useEffect(() => {

    }, [])

    const checkCEP = (e: { target: { value: string; }; }) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json()).then(data => {
                setValue('rua', data.logradouro);
                setValue('bairro', data.bairro);
                setValue('cidade', data.localidade);
                setValue('estado', data.uf);
                setFocus('numero')
                console.log(data)
            })
    }

    return (

        <div className="formInputs">
            <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="cep">
                    <div>CEP:</div>
                    <input type="text" id="cep" {...register("cep")} onBlur={checkCEP} />
                </label>
                {errors.cep && <p>{errors.cep.message}</p>}

                <label htmlFor="rua">
                    <div>Rua:</div>
                    <input type="text" id="rua" {...register("rua")} />
                </label>
                {errors.rua && <p>{errors.rua.message}</p>}

                <label htmlFor="numero">
                    <div>Número:</div>
                    <input type="text" id="numero" {...register("numero")} />
                </label>
                {errors.numero && <p>{errors.numero.message}</p>}

                <label htmlFor="bairro">
                    <div>Bairro:</div>
                    <input type="text" id="bairro" {...register("bairro")} />
                </label>
                {errors.bairro && <p>{errors.bairro.message}</p>}

                <label htmlFor="cidade">
                    <div>Cidade:</div>
                    <input type="text" id="cidade" {...register("cidade")} />
                </label>
                {errors.cidade && <p>{errors.cidade.message}</p>}

                <label htmlFor="estado">
                    <div>Estado:</div>
                    <input type="text" id="estado" {...register("estado")} />
                </label>
                {errors.estado && <p>{errors.estado.message}</p>}

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default App;
