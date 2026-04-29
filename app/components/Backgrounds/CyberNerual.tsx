import styles from './CyberNerual.module.scss';

const CyberNerual = () => {
  return (
    <div className={styles.neuralContainer}>
      <div className={styles.neuralOverlay}></div>
      <div className={styles.neuralDots}></div>
    </div>
  );
}
export default CyberNerual;