import { useEffect, useState } from 'react';
import  styles from '../css/calculator-pages.module.css';
import logoImg from '../image/logo.png'; 
import logoCalculador from '../image/imageCalculador.png'; 

const CalculadoraLaboral = () => {

    /** CREAMOS EL USE STATE PARA AGREGAR LOS CAMPOS DE FECHA DINAMICOS CUANDO SE REQUIERA */
    const [rangosFechas, setRangosFechas] = useState([
        {fechaExperienciaInicial:'', fechaFinalExperiencia:''}
    ]);

    const agregarNuevoRango = () => {
        setRangosFechas([...rangosFechas,{fechaExperienciaInicial:'', fechaFinalExperiencia:''}]);
    };

    const [totalExperiencia, setTotalExperiencia] = useState({
        anios:  0,
        meses:  0,
        dias:   0
    });

    const handleFechaChange = (index, campo, valor) => {
        const nuevosRangos = [...rangosFechas];
        nuevosRangos[index][campo] = valor;
        setRangosFechas(nuevosRangos);
    };

    const calcularDiferenciaFechas = (fechaExperienciaInicial, fechaFinalExperiencia ) => {
        if (!fechaExperienciaInicial || !fechaFinalExperiencia) return { anio:0,  meses: 0, dias:0 };

        const inicio = new Date(fechaExperienciaInicial);
        const fin = new Date(fechaFinalExperiencia);

        if(fin < inicio){
            return { anio:0,  meses: 0, dias:0 };
        }

        let anios = fin.getFullYear() - inicio.getFullYear();
        let meses = fin.getMonth() - inicio.getMonth();
        let dias = fin.getDate() - inicio.getDate();

        if(dias < 0 ){
            meses--;
            const ultimoDiaMesAnterior = new Date(
                fin.getFullYear(),
                fin.getMonth(),
                0
            ).getDate();
            dias += ultimoDiaMesAnterior;

        }

        if(meses < 0){
            anios--;
            meses += 12;
        }

        return {anios, meses, dias};


    };

    const calcularExperienciaTotal = () => {

        const hayFechasIncompletas = rangosFechas.some(
        rango => !rango.fechaExperienciaInicial || !rango.fechaFinalExperiencia
        
        );

        if (hayFechasIncompletas) {
            alert("Por favor, coloque todas las fechas antes de calcular.");
            return;
        }
       
        let totalAnios = 0,
            totalMeses = 0,
            totalDias = 0;

        rangosFechas.forEach(rango => {
            const {anios,meses,dias} = calcularDiferenciaFechas(
                rango.fechaExperienciaInicial,
                rango.fechaFinalExperiencia
            );

            totalAnios += anios;
            totalMeses += meses;
            totalDias += dias;

        });

        totalMeses += Math.floor(totalDias / 30);
        totalDias = totalDias % 30;

        totalAnios += Math.floor(totalMeses / 12);
        totalMeses = totalMeses % 12;

        setTotalExperiencia({
            anios:totalAnios,
            meses: totalMeses,
            dias: totalDias
        });

    }

    /** BOTON BARRA DE NAVEGACION */
    
    const [esVisible, setEsVisible] = useState(true);

    const mostrarBarra = () => {
            setEsVisible(prev => !prev);
        };

    /** LIMPIAR CAMPOS */
    const limpiarFechas = () => {
    // Reinicia los rangos a solo uno vacío
    setRangosFechas([{ fechaExperienciaInicial: '', fechaFinalExperiencia: '' }]);

    // Reinicia el total a cero
    setTotalExperiencia({
        anios: 0,
        meses: 0,
        dias: 0
    });
};



    return(
        <>

            <section className={styles.sectionCalculadora}>
                <span className={styles.decoracionBarraLateral}></span>
                <span className={styles.textDecoracion}>
                    <h4>Kevin David Zambrano Galvis</h4>
                    <h5>Desarrollador de Software</h5>
                    <p>Me gusta transformar ideas en soluciones útiles y sencillas.</p>
                    <p>Bogotá D.C. | 📱 301 530 4944</p>
                    <p>📧 kevindavidtt@gmail.com</p>
                    
                </span>
                
                <article className={styles.articleCalculadora}>
                    <div className={styles.textTitleCalculadora}>
                        <h1>CALCULADORA</h1>
                        <h4>Experiencia Laboral</h4>
                    </div>
                   
                    <div className={styles.containerResultados}>
                        <h2>Total Experiencia</h2>
                        <div className={styles.titulosResultados}>
                            <h2>Años</h2>
                            <h2>Meses</h2>
                            <h2>Dia</h2>
                        </div>

                        <div className={styles.aniosResultados}>
                            <h2>{totalExperiencia.anios}</h2>
                            <h2>{totalExperiencia.meses}</h2>
                            <h2>{totalExperiencia.dias}</h2>
                        </div>

                    </div>
                </article>

                {
                    rangosFechas.map((rango,index) => (
                        <article key={index} className={styles.articleFecha}>
                        
                            <div className={styles.containerDate}>
                                <div className={styles.divFechaInicial}>
                                    <label htmlFor={`fechaExperienciaInicial-${index}`}>Fecha Inicial</label> 
                                    <input 
                                        type="date" 
                                        name="" 
                                        id={`fechaExperienciaInicial-${index}`}
                                        value={rango.fechaExperienciaInicial}
                                        onChange={(e) => handleFechaChange(index,'fechaExperienciaInicial', e.target.value)}
                                        className={styles.inputDateStart}
                                        placeholder='dd/mm/aaaa'
                                    /> 
                                </div>

                                <div className={styles.divFechaInicial}>
                                    <label htmlFor="">Fecha Final</label> 
                                    <input 
                                        type="date"
                                        id={`fechaFinalExperiencia-${index}`}
                                        value={rango.fechaFinalExperiencia}
                                        onChange={(e) => handleFechaChange(index,'fechaFinalExperiencia', e.target.value)}
                                        className={styles.inputDateStart}
                                    
                                    />  
                                </div>

                            </div>
                            
                        </article>
                    ))}
                
            
            
                <div className={styles.divBotonesCalculadora}>
                    <div className={styles.botones}>
                        <button 
                        className={styles.buttonCalcularFecha} 
                        onClick={calcularExperienciaTotal} >Calcular Experiencia
                        </button>
                    
                        <button className={styles.buttonAgregarFecha} 
                                onClick={agregarNuevoRango} >Agregar Fecha
                        </button>
                    
                        <button className={styles.buttonLimpiarFecha} 
                                onClick={limpiarFechas} >Limpiar
                        </button>

                    </div>
                   
                </div>

                <div className={`${styles.menuCalculadora} ${!esVisible ? styles.menuCalculadoraHidden: ""}`}></div>

                    <div className={`${styles.containerMenu} ${!esVisible ? styles.containerMenuHidden: ""}`}>
                           <span className={styles.buttonMenu} onClick={mostrarBarra}>
                                <i className={`bi ${esVisible ? "bi-caret-down-fill" : "bi-caret-up-fill "}`}></i>
                           </span>
                        <div className={styles.textMenu}>
                            <h3>Calculadora Experiencia Laboral</h3>
                        </div>
                        <div className={styles.parrafoMenu}>
                            <h4>
                                Es una calculadora sencilla que ayuda a sumar y organizar los tiempos de experiencia laboral. Solo ingresas las fechas de inicio y fin de cada trabajo, y al final te muestra el total acumulado en años, meses y días de forma clara y rápida.
                            </h4>
                        </div>
                        <div className={styles.figureMenu}>
                            <figure className={styles.figureImg}>
                                <img src={logoCalculador} alt="logo calculadora" />
                            </figure>
                        </div>

                        <div className={styles.footerMenu}>
                            <p>Desarrollada por Kevin David Zambrano Galvis</p>
                            <p>📧 kevindavidtt@gmail.com | 📱 +57 301 530 4944</p>
                        </div>
                        
                    </div>

               
            </section>

        </>
    );
}

export default CalculadoraLaboral;