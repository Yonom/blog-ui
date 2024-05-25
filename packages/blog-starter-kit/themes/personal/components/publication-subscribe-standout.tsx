import request from 'graphql-request';
import { useRef, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import {
	SubscribeToNewsletterDocument,
	SubscribeToNewsletterMutation,
	SubscribeToNewsletterMutationVariables,
} from '../generated/graphql';
import { useAppContext } from './contexts/appContext';
import Button from './hn-button';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

function PublicationSubscribeStandOut() {
	const { publication } = useAppContext();

	const [state, setState] = useState({
		submitDisabled: false,
		err: '',
		subscribed: false,
	});
	const email = useRef<HTMLInputElement>(null);

	const subscribe = async () => {
		if (!publication || !email.current) {
			return;
		}

		const emailVal = email.current.value;
		const publicationId = publication.id?.toString();

		if (!emailVal.trim()) {
			return;
		}
		if (!isEmail(emailVal)) {
			setState({ ...state, err: 'Please enter a valid email' });
			return;
		}
		setState({ ...state, submitDisabled: true });

		const _state = { submitDisabled: false, err: '', subscribed: false };
		try {
			await request<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>(
				GQL_ENDPOINT,
				SubscribeToNewsletterDocument,
				{
					input: { publicationId: publication.id, email: emailVal },
				},
			);
			_state.subscribed = true;
			_state.err = '';
		} catch (error) {
			const message = (error as any).response?.errors?.[0]?.message;
			_state.err = message || 'Something went wrong. Please try again.';
		}
		setState({ ...state, ..._state });
	};

	const handleEmailChange = (e: { keyCode: number }) => {
		if (state.err) {
			setState({ ...state, err: '' });
		}
		if (e.keyCode === 13) {
			subscribe();
		}
	};

	return (
		<div className="flex w-full flex-col items-center border-t pb-10 pt-20 dark:border-neutral-800">
			{!state.subscribed && (
				<>
					<h3 className="font-heading mb-5 text-center text-xl text-slate-900 dark:text-slate-50">
						Subscribe to my newsletter
					</h3>
					<div className="flex flex-row overflow-hidden rounded-lg border border-slate-800 dark:border-slate-200">
						<input
							type="email"
							ref={email}
							onKeyUp={handleEmailChange}
							placeholder="Enter your email address"
							className="w-full bg-transparent p-3 text-black outline-none dark:text-white md:text-lg"
						/>
						<Button
							type="button"
							onClick={subscribe}
							variant="transparent"
							disabled={state.submitDisabled}
							className="ml-10 shrink-0 rounded-none bg-slate-800 px-3 font-bold tracking-wide text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-black dark:hover:bg-slate-300 md:px-5"
						>
							Subscribe
						</Button>
					</div>
				</>
			)}
			{state.subscribed && (
				<div className="flex flex-col items-center overflow-hidden rounded-lg border border-green-600 bg-green-50 p-5 text-center text-slate-900 dark:border-green-400 dark:bg-green-900 dark:text-white md:w-2/3">
					<p className="font-semibold ">
						Thanks for subscribing! <br />
						Please check your inbox to confirm your subscription.
					</p>
				</div>
			)}
			{state.err && <div className="mt-2 text-red-600">{state.err}</div>}
		</div>
	);
}

export default PublicationSubscribeStandOut;
