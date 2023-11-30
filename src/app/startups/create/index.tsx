import cls from 'classnames';
import React from 'react';
import Layout from '../../../components/layout';
import AppContainer from '../../../components/shared/AppContainer';
import { Container } from 'react-bootstrap';
import ContactSection from '../../../components/shared/contact/Contact';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CreateStartup = () => {
  return (
    <Layout>
      <section className="section-pad mb-8 border">
        <AppContainer>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, placeat.
        </AppContainer>
      </section>
      <ContactSection className="mt-5" />
    </Layout>
  );
};

export default CreateStartup;
