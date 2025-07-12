import React from "react";
import { useNavigate } from "react-router-dom";
import  styles from '../css/calculator-pages.module.css';
import logoImg from '../image/logo.png'; 


const CalculatorPage = () => {

  const navigate = useNavigate();
 
    return(
      <>
        <section className={styles.containerCalculator}>
          
          <article className={styles.containerArticle}>
              <h2>Calculator</h2>
              <h1>Work Experience Calculator</h1>
          </article>

          <article className={styles.containerArticleImg}>
              <figure className={styles.containerFigure}>
                  <img src={logoImg} alt="imagen calculadora" />
              </figure>
          </article>
          <article className={styles.containerArticle}>
              <p>Esta herramienta gratuita te ayuda a calcular fácilmente los días, meses y años de experiencia laboral.</p>
              <p>Fue creada para facilitar profesionales y empleadores, y si te ha sido útil, puedes apoyar su mejora con una donación.</p>
          </article>
          <article className={styles.containerButton}>
            <button className="">Donar</button>
          </article>
           <article className={styles.containerArticle}>
              <p>¡Gracias por tu apoyo!</p>
              <p>Kevin David Zambrano Galvis</p>
              <a href="mailto:kevindevelopersr@outlook.com">kevindevelopersr@outlook.com</a>
          </article>
           <article className={styles.containerButton}>
            <button className="" onClick={() => navigate('/calculadora')}>Iniciar Calculadora</button>
          </article>
         
          
        </section>

      </>


    )
}


export default CalculatorPage;