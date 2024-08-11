import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function Observation() {
    const ref = useRef(null);
    const { inView, ref: inViewRef } = useInView();

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                exit={{ opacity: 0 }}
                ref={inViewRef}
            >
                <div className="flex justify-center items-center">
                    <section ref={ref} className="gap-3">
                        <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }}></div>
                        <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }}></div>
                        <div style={{ width: '100px', height: '100px', backgroundColor: 'red' }}></div>
                    </section>
                </div>
            </motion.div>
        </>
    );
}
