import React, { lazy, Suspense } from 'react';
import { Box } from '@chakra-ui/react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import Header from '../ui/header';
import LandingPage from './landing-page';
import Loader from '../ui/loader';
import Footer from '../ui/footer';

const Campaign = lazy(() => import('./campaign'));
const Campaigns = lazy(() => import('./campaigns'));

function Home() {
  const location = useLocation();
  const pathnameArray = location.pathname.split('/');
  const { t } = useTranslation(['titles', 'menuItems']);
  const isLandingPage = location.pathname === '/';

  const menuItems = [
    {
      label: t('menuItems:homepage'),
      href: '/',
    },
    {
      label: t('menuItems:campaigns'),
      href: '/campaigns',
      disabled: true,
    },
  ];

  return (
    <>
      <main>
        {!isLandingPage && <Header menuItems={menuItems} />}
        <Box pt={!isLandingPage && { base: 32, lg: 20 }}>
          <Suspense fallback={<Loader isFull />}>
            <Routes>
              <Route path="campaign/:id" element={<Campaign />} />
              <Route
                path="kampanya/:id"
                element={
                  <Navigate
                    to={`/campaign/${pathnameArray[pathnameArray.length - 1]}`}
                    replace
                  />
                }
              />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route
                path="kampanyalar"
                element={<Navigate to="/campaigns" replace />}
              />
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Box>
      </main>
      <Footer />
    </>
  );
}

export default Home;
