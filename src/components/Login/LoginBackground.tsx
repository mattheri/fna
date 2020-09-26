import React from 'react';
import calc from "./asset/calculator.jpg";
import moneytree from "./asset/moneytree.jpg";
import alarm from "./asset/alarm.jpg";
import plant from "./asset/plant.jpg";
import { Container } from '../Container/Container';
import Masonry from 'masonry-layout';
import { AnimatePresence, motion } from "framer-motion";

export const LoginBackground = () => {

    const masonryRef = React.createRef<HTMLElement>();

    React.useLayoutEffect(() => {
        new Masonry((masonryRef.current as Element), {
            itemSelector: ".grid-item",
            percentPosition: true
        });
    }, []);

    const item = {
        initial: { opacity: 0, scale: 1.2, x: -10 },
        hidden: { opacity: 1, scale: 1, x: 10 },
        exit: { opacity: 0 }
    };

    return (
        <div className="login-background">
            <Container ref={masonryRef}>
                <motion.img animate="hidden" transition={{duration: 1}} key={calc} initial="initial" variants={item} src={calc} className="grid-item" alt=""/>
                <motion.img animate="hidden" transition={{duration: 1}} key={moneytree} initial="initial" variants={item} src={moneytree} className="grid-item grid-item-width-2" alt=""/>
                <motion.img animate="hidden" transition={{duration: 1}} key={alarm} initial="initial" variants={item} src={alarm} className="grid-item grid-item-width-3" alt=""/>
                <motion.img animate="hidden" transition={{duration: 1}} key={plant} initial="initial" variants={item} src={plant} className="grid-item" alt=""/>
            </Container>
        </div>
    );
}
