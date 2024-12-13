// components/FAQ.js
// import axios from 'axios';
import axiosInterceptorInstance from "../../../axios/interceptor";
import styles from "./preguntas.css";
import { useEffect, useState } from "react";
import Modal from "../editar-pregunta";
import { Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ENDPOINTS} from '../../../constants/endpoints'

const FAQ = ({ faqs,admin }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <Box className="faq-Container">
      {faqs?.map((faqs) => (
        <Box key={faqs.id} className="faq-card">
          <Box className="faq-edit">
          {admin==1?<Modal id={faqs.id} title={faqs.title} answer={faqs.answer}></Modal>:""}
          </Box>
          <Box className="faq-question">{faqs.title}</Box>
          <Box className="faq-answer">{faqs.answer}</Box>
          <Box>
          {admin==1?<Button sx={'color: #ffff'} aria-label="delete" onClick={()=>{
              const apiUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;
              axiosInterceptorInstance.delete(ENDPOINTS.deleteFAQ+faqs.id)
                .then(response => {
                    console.log('Pregunta frecuente creada exitosamente:', response.data);
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error al crear la pregunta frecuente:', error);
                });
            }}>
              <DeleteIcon />
            </Button>:""}
            
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FAQ;
