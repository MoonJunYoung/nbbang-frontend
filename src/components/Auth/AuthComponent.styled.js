import { Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const NavBar = styled(motion.div)`
  position: sticky;
  top: 0;
  height: 50px;
  border-bottom: 1px solid #e1e1e1a8;
  background-color: white;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavComent = styled(motion.span)`
  margin-bottom: 5px;
  font-weight: 600;
`;

export const NavIcon = styled(motion.img)`
  width: 20px;
`;

export const SigndContainer = styled(motion.div)`
  position: relative;
`;

export const SigndBox = styled(motion.div)`
`;

export const Form = styled(motion.form)`
`;

export const Input = styled(motion.input)`
  outline: none;
  position: absolute;
  left: 0px;
  top: 6px;
  width: 100%;
  height: 30px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const InputBox = styled(motion.div)`
  border-bottom: 1px solid #0044FE;
  position: relative;
  width: 100%;
  margin-top: 30px;
  height: 40px;
  display: inline-block;
  background-color: white;
`;

export const SignInButton = styled(motion.button)`
  color: white;
  margin: 10px 0px;
  border: 1px solid lightgray;
  bottom: 20px;
  font-size: 13px;
  width: 100%;
  font-weight: 600;
  height: 40px;
  border-radius: 10px;
  &:not(:disabled) {
    background-color: #0044FE;
    border: 1px solid lightgray;
    border-bottom: 1px solid #e1e1e1a8;
    box-shadow: 3px 4px 4px 0px #c6c6c666;
    color: white;
    cursor: pointer;
  }

  &:disabled {
    background-color: #d3d3d3;
    color: white;
  }
`;

export const SigndTopLine = styled(motion.div)`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

export const SigndLine = styled(motion.div)`
  border-top: 1px solid silver;
  width: 135px;
  margin-top: 10px;
  @media (max-width: 768px) {
    width: 150px;
  }
`;

export const SigndLineComent = styled(motion.span)`
  margin: 0 10px;
  font-size: 14px;
  color: silver;
  font-weight: 800;
`;

export const PlatformSignd = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Valid = styled(motion.div)`
  color: #0044FE;
  font-weight: 700;
  margin: 5px 0px;
  font-size: 13px;
`;

export const SignUpLink = styled(motion.div)`
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 15px;
`;

export const AgreementContainer = styled(motion.div)`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  font-size: 14px;
  gap: 3px;
  font-weight: 700;

  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

export const AgreementChenckBox = styled(motion.input)``;

export const LinkStyle = styled(motion(Link))`
  color: #0044FE;
  margin: 10px 5px;
  font-weight: 700;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AuthenticationTitleContainer = styled(motion.div)`
  text-align: left;
  margin-top: 80px;
`;

export const AuthenticationTitle = styled(motion.p)`
  font-size: 25px;
  font-weight: 700;
  margin: 10px 0px;
  animation: ${fadeIn} 1s;
`;

export const AuthenticationSubtitle = styled(motion.p)`
  font-size: 20px;
  font-weight: 700;
  color: #979797;
  margin: 10px 0px;
  animation: ${fadeIn} 1s;
`;

export const ResetButton = styled(motion.span)`
  position: absolute;
  right: 3px;
  top: 10px;
  font-weight: 700;
  cursor: pointer;
`;

export const AuthRequestContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  margin-top: 100px;
  bottom: ${(props) => (props.title ? '-200px' : '')};
`;
