/* eslint-disable react/jsx-props-no-spreading *//* eslint-disable prettier/prettier */
import axios from "axios";
import { useForm } from "react-hook-form";
import './App.css'

interface IFormInputProps {
    zipCode: string;
    address: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
}

function App() {
    const { register, handleSubmit, setValue, setFocus, formState: { errors } } = useForm<IFormInputProps>();

    const postZipCodeRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        const data = e
        // console.log('data', data)
        await axios.post('http://localhost:3333/api/zipcode', {
            data
        })
            .then(res => console.log('data', res))
            .catch(error => console.log(error));
        // console.log('data', res)
        // console.log(e)
    }

    const checkCEP = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json()).then(data => {
                setValue('zipCode', data.cep);
                setValue('address', data.logradouro);
                setValue('bairro', data.bairro);
                setValue('cidade', data.localidade);
                setValue('estado', data.uf);
                setFocus('numero')
                console.log(data)
            })
    }
    // const checkCEP = (e: { target: { value: string; }; }) => {
    //     useEffect(() => {
    //         const cep = e.target.value.replace(/\D/g, '');

    //         axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    //             .then(res => {
    //                 console.log(checkCEP)
    //             })

    //     }
    // }, [])

    return (

        <div className="formInputs">
            <form action="/zipcode" method="POST" onSubmit={handleSubmit(() => postZipCodeRegister)}>

                <label htmlFor="zipCode">
                    <div>CEP:</div>
                    <input type="text" id="zipCode" {...register("zipCode")} onBlur={checkCEP} />
                </label>
                {errors.zipCode && <p>{errors.zipCode.message}</p>}

                <label htmlFor="address">
                    <div>Rua:</div>
                    <input type="text" id="address" {...register("address")} />
                </label>
                {errors.address && <p>{errors.address.message}</p>}

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
            <div>
                {/* <p>{data.logradouro}</p>
                {data.bairro}
                {data.localidade}
                {data.uf} */}
            </div>
        </div>
    );
}

export default App;
