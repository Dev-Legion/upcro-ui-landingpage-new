import React from 'react'
import { Box, Button, Container, Heading, Image, Text } from '@chakra-ui/react'
import { Element } from 'react-scroll';

export default function RoadmapSec() {
  return (
    <>
    <Element name='Roadmap'>
        <Container maxW="container.xl">
            <Box className='roadmapsec_main'>
                <Box className='roamap_bg' />
                <Box className='sadow_box' data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
                    <Heading as="h6">How we move</Heading>
                    <Heading as="h3">Roadmap</Heading>
                </Box>
                <Box className='roadmap_cntnt'>
                    <Box className='road_cntnt_row road_cntnt_row_01'>
                        <Box className='road_map_img_prnt' data-aos="zoom-out" data-aos-delay="700">
                            <Image src='img/road_map_img01.png' alt='' className='road_map_img0 pulse' />
                        </Box>
                        <Box className='road_text_prnt' data-aos="fade-up" data-aos-delay="500">
                            <Heading as="h5">UpOnly Integration</Heading>
                            <Text>Fees generated from UpOnly contracts launched on Cronos will feed value back to the upCRO cornerstone vault, recycling even more extracted value back into the ecosystem to the benefit of token holders.</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt' data-aos="zoom-out" data-aos-delay="800">
                            <Image src='img/road_map_img02.png' alt='' className='road_map_img0 pulse' />
                        </Box>
                        <Box className='road_text_prnt' data-aos="fade-up" data-aos-delay="600">
                            <Heading as="h5">Activate New Buyback Vault</Heading>
                            <Text>Our newest vault, still in development, will have an auto-buyback feature with customizable parameters. We will be working closely with our community to choose our vault buyback strategies.</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt' data-aos="zoom-out" data-aos-delay="900">
                            <Image src='img/road_map_img03.png' alt='' className='road_map_img0 pulse' />
                        </Box>
                        <Box className='road_text_prnt' data-aos="fade-up" data-aos-delay="700">
                            <Heading as="h5">Activate Marketing Vault</Heading>
                            <Text>The marketing vault will receive 11.11% of the funds raised in our market generation even as well as 20% of all collected trade fees. With our automatic buybacks in place our dedicated maketing vault will allow us to continue to ramp up upCRO’s marketing efforts.</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt' data-aos="zoom-out" data-aos-delay="1000">
                            <Image src='img/road_map_img04.png' alt='' className='road_map_img0 pulse' />
                        </Box>
                        <Box className='road_text_prnt' data-aos="fade-up" data-aos-delay="800">
                            <Heading as="h5">Token launch with over 10k% staking APY</Heading>
                            <Text>Right when the MGE finishes and the market goes live there will be no circulating tokens so if users want some of the 10k% APY staking rewards they will have to buy from the market. This should create the perfect launch conditions</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt' data-aos="zoom-out" data-aos-delay="1100">
                            <Image src='img/road_map_img05.png' alt='' className='road_map_img0 pulse' />
                        </Box>
                        <Box className='road_text_prnt' data-aos="fade-up" data-aos-delay="900">
                            <Heading as="h5">Activate Marketing Vault</Heading>
                            <Text>The marketing vault will receive 11.11% of the MGE funds and 20% of all collected trade fees. After initial volitility settles and the APY gets down to a reasonable level we will begin our post launch marketing efforts.</Text>
                        </Box>
                    </Box>
                    <Box className='road_cntnt_row'>
                        <Box className='road_map_img_prnt' data-aos="zoom-out" data-aos-delay="1200">
                            <Image src='img/road_map_img06.png' alt='' className='road_map_img0 pulse' />
                        </Box>
                        <Box className='road_text_prnt' data-aos="fade-up" data-aos-delay="1000">
                            <Heading as="h5">Activate New Buy-Back Vault</Heading>
                            <Text>Our newest vault, still in development, will have an auto-buy-back feature with customizable paramiters. We will be working closely with our community to choose the vaults buy-back strategies.</Text>
                        </Box>
                    </Box>
                </Box>
                <Box className='enter_roadmap_btn_prnt'>
                    <Button as="a" href='/dashboard' className='enter_roadmap_btn btn_box_shedow'>ENTER APP</Button>
                </Box>
            </Box>
        </Container>   
    </Element>
    </>
  )
}
