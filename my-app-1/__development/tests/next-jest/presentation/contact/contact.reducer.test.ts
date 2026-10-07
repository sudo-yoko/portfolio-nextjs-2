import {
    ActionType,
    initialState,
    reducer,
    Status,
    type State,
} from '@/presentation/contact/mvvm/view-models/contact.reducer';

const createState = (): State => ({
    status: Status.input,
    formData: {
        name: 'Test User',
        email: 'test@example.com',
        zipcode: '1234567',
        address1: 'Address line 1',
        address2: 'Address line 2',
        body: 'Contact message',
    },
    violations: [{ field: 'email', violation: ['Invalid email'] }],
    retryMsg: ['Please try again'],
});

describe('contact reducer', () => {
    test('initializes input with no violations or retry messages', () => {
        expect(initialState).toStrictEqual({
            status: Status.input,
            formData: {
                name: '',
                email: 'test@mail.com',
                zipcode: '',
                address1: '',
                address2: '',
                body: '',
            },
            violations: [],
            retryMsg: [],
        });
    });

    test.each(['name', 'email', 'zipcode', 'address1', 'address2', 'body'] as const)(
        'edits %s without mutating the previous state or form data',
        (key) => {
            const state = createState();
            const before = createState();
            Object.freeze(state.formData);
            Object.freeze(state);

            const next = reducer(state, { type: ActionType.setValue, key, value: 'Updated' });

            expect(next).toStrictEqual({ ...before, formData: { ...before.formData, [key]: 'Updated' } });
            expect(next).not.toBe(state);
            expect(next.formData).not.toBe(state.formData);
            expect(state).toStrictEqual(before);
        },
    );

    test('replaces violations without changing the other state', () => {
        const state = createState();
        const violations: State['violations'] = [{ field: 'body', violation: ['Required'] }];
        const next = reducer(state, { type: ActionType.setViolations, violations });

        expect(next).toStrictEqual({ ...state, violations });
        expect(next).not.toBe(state);
        expect(state).toStrictEqual(createState());
        expect(reducer(next, { type: ActionType.setViolations, violations: [] })).toStrictEqual({
            ...state,
            violations: [],
        });
    });

    test('confirmation clears violations and preserves form data and retry messages', () => {
        const state = createState();
        expect(reducer(state, { type: ActionType.toConfirm })).toStrictEqual({
            ...state,
            status: Status.confirm,
            violations: [],
        });
        expect(state).toStrictEqual(createState());
    });

    test('sending preserves state and completion clears violations', () => {
        const state = { ...createState(), status: Status.confirm };
        const sending = reducer(state, { type: ActionType.toSending });
        expect(sending).toStrictEqual({ ...state, status: Status.sending });
        expect(reducer(sending, { type: ActionType.toComplete })).toStrictEqual({
            ...sending,
            status: Status.complete,
            violations: [],
        });
        expect(sending.violations).toStrictEqual(createState().violations);
    });

    test('sets retry messages and returns to input without losing form data', () => {
        const state = { ...createState(), status: Status.sending };
        const retryMsg = ['Service unavailable', 'Please retry later'];
        const retryable = reducer(state, { type: ActionType.setRetryable, retryMsg });
        expect(retryable).toStrictEqual({ ...state, retryMsg });
        expect(reducer(retryable, { type: ActionType.toInput })).toStrictEqual({
            ...retryable,
            status: Status.input,
        });
        expect(state.retryMsg).toStrictEqual(['Please try again']);
    });

    test('aborts without losing state and resets to the initial state', () => {
        const state = createState();
        const aborted = reducer(state, { type: ActionType.FAILED });
        expect(aborted).toStrictEqual({ ...state, status: Status.abort });

        const reset = reducer(aborted, { type: ActionType.reset });
        expect(reset).toStrictEqual(initialState);
        expect(reset).not.toBe(initialState);
        expect(reset).not.toBe(aborted);
        expect(state).toStrictEqual(createState());
    });
});
