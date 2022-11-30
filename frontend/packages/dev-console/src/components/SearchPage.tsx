import * as React from 'react';
import { Button } from '@patternfly/react-core';
import Helmet from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import { match as RMatch } from 'react-router';
import { SearchPage } from '@console/internal/components/search';
import { withStartGuide } from '@console/internal/components/start-guide';
import NamespacedPage, { NamespacedPageVariants } from './NamespacedPage';
import CreateProjectListPage from './projects/CreateProjectListPage';

export interface SearchPageProps {
  match: RMatch<{
    ns?: string;
  }>;
  noProjectsAvailable?: boolean;
}

const ProjectListPage = () => {
  const { t } = useTranslation();
  return (
    <CreateProjectListPage title={t('devconsole~Search')}>
      {(openProjectModal) => (
        <Trans t={t} ns="devconsole">
          Select a Project to search inside or{' '}
          <Button isInline variant="link" onClick={openProjectModal}>
            create a Project
          </Button>
          .
        </Trans>
      )}
    </CreateProjectListPage>
  );
};

const ProjectListPageWithStartGuide = withStartGuide(ProjectListPage);

const PageContents: React.FC<SearchPageProps> = ({ noProjectsAvailable, ...props }) => {
  const namespace = props.match.params.ns;
  return namespace ? (
    <SearchPage namespace={namespace} noProjectsAvailable={noProjectsAvailable} />
  ) : (
    <ProjectListPageWithStartGuide />
  );
};

const Search: React.FC<SearchPageProps> = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title data-test="page-title">{t('devconsole~Search')}</title>
      </Helmet>
      <NamespacedPage variant={NamespacedPageVariants.light} hideApplications>
        <PageContents {...props} />
      </NamespacedPage>
    </>
  );
};

export default Search;