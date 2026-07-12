import { solutionsData } from '@/data';
import styles from './ProductShowcase.module.css';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ProductShowcase = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Breathe Clean Air Indoors</h2>
          <p className={styles.subtitle}>
            Explore our curated selection of top-rated air purifiers and monitors designed to keep your home environment safe.
          </p>
        </div>

        <div className={styles.grid}>
          {solutionsData.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.category}>Solution</span>
                <div className={styles.imageBox}>
                  {product.title.split(' ')[0]}
                </div>
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.productName}>{product.title}</h3>
                <p className={styles.description}>{product.description}</p>
                
                <div className={styles.footer}>
                  <a href={product.link} className={styles.shopBtn}>
                    Learn More <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
