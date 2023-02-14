import React from 'react';

import { Styled } from './styles';

const Footer = () => {
  const githubUrl = 'https://github.com/viniciussoaresbr';

  return (
    <Styled.Footer>
      <Styled.GithubLink href={githubUrl} target="_blank">
        <Styled.GithubIcon />
        <Styled.GithubProfile>Vinicius Soares</Styled.GithubProfile>
      </Styled.GithubLink>
    </Styled.Footer>
  );
};

export default Footer;
