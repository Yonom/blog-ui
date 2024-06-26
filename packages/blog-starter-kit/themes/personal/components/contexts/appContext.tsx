import React, { createContext, useContext } from 'react';
import {
	PageByPublicationQuery,
	PostFullFragment,
	PublicationFragment,
} from '../../generated/graphql';
import { ThemeProvider } from '../theme-provider';

type AppContext = {
	publication: PublicationFragment;
	post: PostFullFragment | null;
	page: NonNullable<PageByPublicationQuery['publication']>['staticPage'];
};

const AppContext = createContext<AppContext | null>(null);

const AppProvider = ({
	children,
	publication,
	post,
	page,
}: {
	children: React.ReactNode;
	publication: PublicationFragment;
	post?: PostFullFragment | null;
	page?: NonNullable<PageByPublicationQuery['publication']>['staticPage'];
}) => {
	return (
		<AppContext.Provider
			value={{
				publication,
				post: post ?? null,
				page: page ?? null,
			}}
		>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{children}
			</ThemeProvider>
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error('useAppContext must be used within a <AppProvider />');
	}

	return context;
};
export { AppProvider, useAppContext };
