import React from 'react'
import { Box, SimpleGrid, GridItem, Heading, Text, Button, Image } from '@chakra-ui/react'
import { Element } from 'react-scroll';
import Lottie from 'react-lottie';
import t1 from '../../assets/lottie/upCRO.json'
// import { motion, useMotionValue, useTransform } from "framer-motion";


export default function FirstSec() {
    // const x = useMotionValue(200);
    // const y = useMotionValue(200);

    // const rotateX = useTransform(y, [0, 400], [15, -15]);
    // const rotateY = useTransform(x, [0, 400], [-15, 15]);

    // function handleMouse(event:any) {
    //     const rect = event.currentTarget.getBoundingClientRect();

    //     x.set(event.clientX - rect.left);
    //     y.set(event.clientY - rect.top);
    // }
    const top = {
        loop: true,
        autoplay: true,
        animationData: t1,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };
  return (
    <>
    <Element name='Introduction'>
        <Box className='for_frts_bg'>
            <Box className='upcro_launch_main'>
                <Box className='width_full'>
                    <SimpleGrid columns={12} columnGap={3} rowGap={2} >
                        <GridItem colSpan={[12, 12, 12, 6]}>
                            <Box className='launch_text_box'>
                                <Box className='launch_text_box_inn' data-aos="fade-up" data-aos-delay="1000" data-aos-duration="800">
                                    <Heading as="h3">upCRO</Heading>
                                    <Text>
                                        UpCRO is our most advanced UpToken ever and our first ERC-31337 token on Cronos chain.
                                        <br/>
                                        Paired against CRO; upCRO is the cornerstone vault of the Root Finance upToken ecosystem on Cronos.
                                    </Text>
                                    <Box className='launch_btns'>
                                        <Button className='btn_box_shedow' as="a" target='_blank' rel="noreferrer" href='https://cro.empiredex.org/#/swap?outputCurrency=0xb062084aFfDf75b9b494D56B8417F1B981Df790f'>BUY NOW</Button>
                                        <Button as="a" href='/dashboard' className='entr_a btn_box_shedow'>ENTER APP</Button>
                                        <Button className='btn_box_shedow' as="a" target='_blank' rel="noreferrer" href='https://www.dextools.io/app/cronos/pair-explorer/0xb0a7d88202eb8bf3c43d506b712b4e474eb9cda3'>CHART</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={[12, 12, 12, 6]}>
                            <Box className='launch_text_box' data-aos="zoom-in" data-aos-delay="500">
                                {/* <motion.div onMouseMove={handleMouse}
                                    style={{
                                        display: "flex",
                                        placeItems: "center",
                                        placeContent: "center",
                                        width: "100%",
                                        perspective: 400
                                    }}>
                                    <motion.div 
                                    style={{
                                        width: "100%",
                                        rotateX: rotateX,
                                        rotateY: rotateY
                                    }}> */}
                                        <Box className='radial_gradiant_box'>
                                            <Lottie options={top} width={650} height={650}></Lottie>
                                            {/* <Image src='img/first_clas_img_one.svg' className='upcro_first_img' /> */}
                                        </Box>
                                    {/* </motion.div>
                                </motion.div> */}
                            </Box>
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </Box>
        </Box>
        
    </Element>
    </>
  )
}
