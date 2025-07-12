import { useEffect, useState } from 'react';
import  styles from '../css/calculator-pages.module.css';
import logoImg from '../image/logo.png'; 

const CalculadoraLaboral = () => {
    
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    
    const [anio, setAnio] = useState(0);
    const [meses, setMeses] = useState(0);
    const [dia, setDia] = useState(0);

    const obtenemosFechaInicial = (e) => {
        setFechaInicial(e.target.value);
    }

    const obtenemosFechaFinal = (e) => {
        setFechaFinal(e.target.value);
    }

    const calcularExperiencia = () => {
        /** VARIABLES PARA HACER LA VALIDACION ENTRE FECHAS */
        const fechaInicioExperiencia = new Date(fechaInicial);
        const fechaFinalExperiencia = new Date(fechaFinal);
        /** */
        let aniosExperiencia = fechaFinalExperiencia.getFullYear() - fechaInicioExperiencia.getFullYear();
        let mesesExperiencia = fechaFinalExperiencia.getMonth() - fechaInicioExperiencia.getMonth();
        let diasExperiencia = fechaFinalExperiencia.getDate() - fechaInicioExperiencia.getDate();

        /** CONDICIONES SI PRESENTAMOS ALGUN ERROR O DATO FALTANTR */
        if(!fechaInicial){
            alert("Por Favor Ingrese la fecha Inicial");
            return;
        }

        if(!fechaFinal){
            alert("Por Favor Ingrese la fecha Final");
            return;
        }

        if(fechaInicioExperiencia > fechaFinalExperiencia){
            alert("La Fecha final no puede ser menor a la fecha inicial");
            return;
        }

        if(diasExperiencia < 0){
            mesesExperiencia -= 1;
            const ultimoDiaMesAnterior = new Date(fechaFinalExperiencia.getFullYear(),fechaFinalExperiencia.getMonth(),0).getDate();
            diasExperiencia += ultimoDiaMesAnterior;
            console.log("DIAS", diasExperiencia);
        }

        if(mesesExperiencia < 0 ){
            aniosExperiencia -= 1;
            mesesExperiencia += 12;
        }

        setAnio(aniosExperiencia);
        setMeses(mesesExperiencia);
        setDia(diasExperiencia);

         console.log(`Años ${aniosExperiencia},Meses ${mesesExperiencia}, Dias ${diasExperiencia} FECHA FINAL`);
        
    }
   
    return(
        <section className={styles.sectionCalculadora}>
            <article className={styles.articleCalculadora}>
                <h1>CALCULADORA</h1>
                <h4>Experiencia Laboral</h4>
            </article>

             <article className={styles.articleFecha}>
                <div className={styles.divFechaInicial}>
                    <label htmlFor="">Fecha Inicial</label>
                    <input 
                        type="date" 
                        name="" 
                        id=""
                        value={fechaInicial}    
                        onChange={obtenemosFechaInicial}  
                    />
                </div>

                <div className={styles.divFechaFinal}>
                    <label htmlFor="">Fecha Final</label>
                    <input 
                        type="date" 
                        name="" 
                        id=""
                        value={fechaFinal}
                        onChange={obtenemosFechaFinal}     
                    />
                </div>

            </article>
           
           
            <div className={styles.divBotonesCalculadora}>
                <button 
                    className={styles.buttonCalcularFecha} 
                    onClick={calcularExperiencia}>Calcular Experiencia</button>
                
                <button className={styles.buttonAgregarFecha}>Agregar Fecha</button>
            </div>
            <div className={styles.divTextoCalculadora}>
                <div className="textAnios">
                    <h3>Años</h3>
                    <h2>{anio}</h2>
                </div>
                <div className="textMeses">
                    <h3>Meses</h3>
                    <h2>{meses}</h2>
                </div>
                <div className="textDias">
                    <h3>Dias</h3>
                    <h2>{dia}</h2>
                </div>

            </div>
        </section>
    );
}

export default CalculadoraLaboral;