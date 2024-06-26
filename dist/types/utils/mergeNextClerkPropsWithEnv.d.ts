import type { NextClerkProviderProps } from '../types';
export declare const mergeNextClerkPropsWithEnv: (props: Omit<NextClerkProviderProps, 'children'>) => {
    frontendApi: string;
    publishableKey: string;
    clerkJSUrl: string | undefined;
    clerkJSVersion: string | undefined;
    proxyUrl: string | ((url: URL) => string);
    domain: string | ((url: URL) => string);
    isSatellite: boolean | ((url: URL) => boolean);
    signInUrl: string;
    signUpUrl: string;
    afterSignInUrl: string;
    afterSignUpUrl: string;
    sdkMetadata: {
        name: string;
        version: string;
    };
    appearance?: import("@clerk/types").Appearance | undefined;
    localization?: import("@clerk/types").DeepPartial<{
        locale: string;
        roles: {
            [r: string]: string;
        };
        socialButtonsBlockButton: string;
        dividerText: string;
        formFieldLabel__emailAddress: string;
        formFieldLabel__emailAddresses: string;
        formFieldLabel__phoneNumber: string;
        formFieldLabel__username: string;
        formFieldLabel__emailAddress_phoneNumber: string;
        formFieldLabel__emailAddress_username: string;
        formFieldLabel__phoneNumber_username: string;
        formFieldLabel__emailAddress_phoneNumber_username: string;
        formFieldLabel__password: string;
        formFieldLabel__currentPassword: string;
        formFieldLabel__newPassword: string;
        formFieldLabel__confirmPassword: string;
        formFieldLabel__signOutOfOtherSessions: string;
        formFieldLabel__automaticInvitations: string;
        formFieldLabel__firstName: string;
        formFieldLabel__lastName: string;
        formFieldLabel__backupCode: string;
        formFieldLabel__organizationName: string;
        formFieldLabel__organizationSlug: string;
        formFieldLabel__organizationDomain: string;
        formFieldLabel__organizationDomainEmailAddress: string;
        formFieldLabel__organizationDomainEmailAddressDescription: string;
        formFieldLabel__organizationDomainDeletePending: string;
        formFieldLabel__confirmDeletion: string;
        formFieldLabel__role: string;
        formFieldInputPlaceholder__emailAddress: string;
        formFieldInputPlaceholder__emailAddresses: string;
        formFieldInputPlaceholder__phoneNumber: string;
        formFieldInputPlaceholder__username: string;
        formFieldInputPlaceholder__emailAddress_phoneNumber: string;
        formFieldInputPlaceholder__emailAddress_username: string;
        formFieldInputPlaceholder__phoneNumber_username: string;
        formFieldInputPlaceholder__emailAddress_phoneNumber_username: string;
        formFieldInputPlaceholder__password: string;
        formFieldInputPlaceholder__firstName: string;
        formFieldInputPlaceholder__lastName: string;
        formFieldInputPlaceholder__backupCode: string;
        formFieldInputPlaceholder__organizationName: string;
        formFieldInputPlaceholder__organizationSlug: string;
        formFieldInputPlaceholder__organizationDomain: string;
        formFieldInputPlaceholder__organizationDomainEmailAddress: string;
        formFieldError__notMatchingPasswords: string;
        formFieldError__matchingPasswords: string;
        formFieldError__verificationLinkExpired: string;
        formFieldAction__forgotPassword: string;
        formFieldHintText__optional: string;
        formFieldHintText__slug: string;
        formButtonPrimary: string;
        signInEnterPasswordTitle: string;
        backButton: string;
        footerActionLink__useAnotherMethod: string;
        badge__primary: string;
        badge__thisDevice: string;
        badge__userDevice: string;
        badge__otherImpersonatorDevice: string;
        badge__default: string;
        badge__unverified: string;
        badge__requiresAction: string;
        badge__you: string;
        footerPageLink__help: string;
        footerPageLink__privacy: string;
        footerPageLink__terms: string;
        paginationButton__previous: string;
        paginationButton__next: string;
        paginationRowText__displaying: string;
        paginationRowText__of: string;
        membershipRole__admin: string;
        membershipRole__basicMember: string;
        membershipRole__guestMember: string;
        signUp: {
            start: {
                title: string;
                subtitle: string;
                actionText: string;
                actionLink: string;
            };
            emailLink: {
                title: string;
                subtitle: string;
                formTitle: string;
                formSubtitle: string;
                resendButton: string;
                verified: {
                    title: string;
                };
                loading: {
                    title: string;
                };
                verifiedSwitchTab: {
                    title: string;
                    subtitle: string;
                    subtitleNewTab: string;
                };
            };
            emailCode: {
                title: string;
                subtitle: string;
                formTitle: string;
                formSubtitle: string;
                resendButton: string;
            };
            phoneCode: {
                title: string;
                subtitle: string;
                formTitle: string;
                formSubtitle: string;
                resendButton: string;
            };
            continue: {
                title: string;
                subtitle: string;
                actionText: string;
                actionLink: string;
            };
        };
        signIn: {
            start: {
                title: string;
                subtitle: string;
                actionText: string;
                actionLink: string;
                actionLink__use_email: string;
                actionLink__use_phone: string;
                actionLink__use_username: string;
                actionLink__use_email_username: string;
            };
            password: {
                title: string;
                subtitle: string;
                actionLink: string;
            };
            passwordPwned: {
                title: string;
            };
            forgotPasswordAlternativeMethods: {
                title: string;
                label__alternativeMethods: string;
                blockButton__resetPassword: string;
            };
            forgotPassword: {
                title_email: string;
                title_phone: string;
                subtitle: string;
                formTitle: string;
                formSubtitle_email: string;
                formSubtitle_phone: string;
                resendButton: string;
            };
            resetPassword: {
                title: string;
                formButtonPrimary: string;
                successMessage: string;
                requiredMessage: string;
            };
            resetPasswordMfa: {
                detailsLabel: string;
            };
            emailCode: {
                title: string;
                subtitle: string;
                formTitle: string;
                formSubtitle: string;
                resendButton: string;
            };
            emailLink: {
                title: string;
                subtitle: string;
                formTitle: string;
                formSubtitle: string;
                resendButton: string;
                unusedTab: {
                    title: string;
                };
                verified: {
                    title: string;
                    subtitle: string;
                };
                verifiedSwitchTab: {
                    subtitle: string;
                    titleNewTab: string;
                    subtitleNewTab: string;
                };
                loading: {
                    title: string;
                    subtitle: string;
                };
                failed: {
                    title: string;
                    subtitle: string;
                };
                expired: {
                    title: string;
                    subtitle: string;
                };
            };
            phoneCode: {
                title: string;
                subtitle: string;
                formTitle: string;
                formSubtitle: string;
                resendButton: string;
            };
            phoneCodeMfa: {
                title: string;
                subtitle: string;
                formTitle: string;
                formSubtitle: string;
                resendButton: string;
            };
            totpMfa: {
                title: string;
                subtitle: string;
                formTitle: string;
                formSubtitle: string;
            };
            backupCodeMfa: {
                title: string;
                subtitle: string;
                formTitle: string;
                formSubtitle: string;
            };
            alternativeMethods: {
                title: string;
                actionLink: string;
                blockButton__emailLink: string;
                blockButton__emailCode: string;
                blockButton__phoneCode: string;
                blockButton__password: string;
                blockButton__totp: string;
                blockButton__backupCode: string;
                getHelp: {
                    title: string;
                    content: string;
                    blockButton__emailSupport: string;
                };
            };
            noAvailableMethods: {
                title: string;
                subtitle: string;
                message: string;
            };
        };
        userProfile: {
            mobileButton__menu: string;
            formButtonPrimary__continue: string;
            formButtonPrimary__finish: string;
            formButtonReset: string;
            start: {
                headerTitle__account: string;
                headerTitle__security: string;
                headerSubtitle__account: string;
                headerSubtitle__security: string;
                profileSection: {
                    title: string;
                };
                usernameSection: {
                    title: string;
                    primaryButton__changeUsername: string;
                    primaryButton__setUsername: string;
                };
                emailAddressesSection: {
                    title: string;
                    primaryButton: string;
                    detailsTitle__primary: string;
                    detailsSubtitle__primary: string;
                    detailsAction__primary: string;
                    detailsTitle__nonPrimary: string;
                    detailsSubtitle__nonPrimary: string;
                    detailsAction__nonPrimary: string;
                    detailsTitle__unverified: string;
                    detailsSubtitle__unverified: string;
                    detailsAction__unverified: string;
                    destructiveActionTitle: string;
                    destructiveActionSubtitle: string;
                    destructiveAction: string;
                };
                phoneNumbersSection: {
                    title: string;
                    primaryButton: string;
                    detailsTitle__primary: string;
                    detailsSubtitle__primary: string;
                    detailsAction__primary: string;
                    detailsTitle__nonPrimary: string;
                    detailsSubtitle__nonPrimary: string;
                    detailsAction__nonPrimary: string;
                    detailsTitle__unverified: string;
                    detailsSubtitle__unverified: string;
                    detailsAction__unverified: string;
                    destructiveActionTitle: string;
                    destructiveActionSubtitle: string;
                    destructiveAction: string;
                };
                connectedAccountsSection: {
                    title: string;
                    primaryButton: string;
                    title__conectionFailed: string;
                    title__connectionFailed: string;
                    title__reauthorize: string;
                    subtitle__reauthorize: string;
                    actionLabel__conectionFailed: string;
                    actionLabel__connectionFailed: string;
                    actionLabel__reauthorize: string;
                    destructiveActionTitle: string;
                    destructiveActionSubtitle: string;
                    destructiveActionAccordionSubtitle: string;
                };
                enterpriseAccountsSection: {
                    title: string;
                };
                passwordSection: {
                    title: string;
                    primaryButton__changePassword: string;
                    primaryButton__setPassword: string;
                };
                mfaSection: {
                    title: string;
                    primaryButton: string;
                    phoneCode: {
                        destructiveActionTitle: string;
                        destructiveActionSubtitle: string;
                        destructiveActionLabel: string;
                        title__default: string;
                        title__setDefault: string;
                        subtitle__default: string;
                        subtitle__setDefault: string;
                        actionLabel__setDefault: string;
                    };
                    backupCodes: {
                        headerTitle: string;
                        title__regenerate: string;
                        subtitle__regenerate: string;
                        actionLabel__regenerate: string;
                    };
                    totp: {
                        headerTitle: string;
                        title: string;
                        subtitle: string;
                        destructiveActionTitle: string;
                        destructiveActionSubtitle: string;
                        destructiveActionLabel: string;
                    };
                };
                activeDevicesSection: {
                    title: string;
                    primaryButton: string;
                    detailsTitle: string;
                    detailsSubtitle: string;
                    destructiveActionTitle: string;
                    destructiveActionSubtitle: string;
                    destructiveAction: string;
                };
                web3WalletsSection: {
                    title: string;
                    primaryButton: string;
                    destructiveActionTitle: string;
                    destructiveActionSubtitle: string;
                    destructiveAction: string;
                };
                dangerSection: {
                    title: string;
                    deleteAccountButton: string;
                    deleteAccountTitle: string;
                    deleteAccountDescription: string;
                };
            };
            profilePage: {
                title: string;
                imageFormTitle: string;
                imageFormSubtitle: string;
                imageFormDestructiveActionSubtitle: string;
                fileDropAreaTitle: string;
                fileDropAreaAction: string;
                fileDropAreaHint: string;
                readonly: string;
                successMessage: string;
            };
            usernamePage: {
                title: string;
                successMessage: string;
            };
            emailAddressPage: {
                title: string;
                emailCode: {
                    formHint: string;
                    formTitle: string;
                    formSubtitle: string;
                    resendButton: string;
                    successMessage: string;
                };
                emailLink: {
                    formHint: string;
                    formTitle: string;
                    formSubtitle: string;
                    resendButton: string;
                    successMessage: string;
                };
                removeResource: {
                    title: string;
                    messageLine1: string;
                    messageLine2: string;
                    successMessage: string;
                };
            };
            phoneNumberPage: {
                title: string;
                successMessage: string;
                infoText: string;
                infoText__secondary: string;
                removeResource: {
                    title: string;
                    messageLine1: string;
                    messageLine2: string;
                    successMessage: string;
                };
            };
            connectedAccountPage: {
                title: string;
                formHint: string;
                formHint__noAccounts: string;
                socialButtonsBlockButton: string;
                successMessage: string;
                removeResource: {
                    title: string;
                    messageLine1: string;
                    messageLine2: string;
                    successMessage: string;
                };
            };
            web3WalletPage: {
                title: string;
                subtitle__availableWallets: string;
                subtitle__unavailableWallets: string;
                successMessage: string;
                removeResource: {
                    title: string;
                    messageLine1: string;
                    messageLine2: string;
                    successMessage: string;
                };
            };
            passwordPage: {
                title: string;
                readonly: string;
                successMessage: string;
                changePasswordTitle: string;
                changePasswordSuccessMessage: string;
                sessionsSignedOutSuccessMessage: string;
            };
            mfaPage: {
                title: string;
                formHint: string;
            };
            mfaTOTPPage: {
                title: string;
                verifyTitle: string;
                verifySubtitle: string;
                successMessage: string;
                authenticatorApp: {
                    infoText__ableToScan: string;
                    infoText__unableToScan: string;
                    inputLabel__unableToScan1: string;
                    inputLabel__unableToScan2: string;
                    buttonAbleToScan__nonPrimary: string;
                    buttonUnableToScan__nonPrimary: string;
                };
                removeResource: {
                    title: string;
                    messageLine1: string;
                    messageLine2: string;
                    successMessage: string;
                };
            };
            mfaPhoneCodePage: {
                title: string;
                primaryButton__addPhoneNumber: string;
                subtitle__availablePhoneNumbers: string;
                subtitle__unavailablePhoneNumbers: string;
                successMessage: string;
                removeResource: {
                    title: string;
                    messageLine1: string;
                    messageLine2: string;
                    successMessage: string;
                };
            };
            backupCodePage: {
                title: string;
                title__codelist: string;
                subtitle__codelist: string;
                infoText1: string;
                infoText2: string;
                successSubtitle: string;
                successMessage: string;
                actionLabel__copy: string;
                actionLabel__copied: string;
                actionLabel__download: string;
                actionLabel__print: string;
            };
            deletePage: {
                title: string;
                messageLine1: string;
                messageLine2: string;
                actionDescription: string;
                confirm: string;
            };
        };
        userButton: {
            action__manageAccount: string;
            action__signOut: string;
            action__signOutAll: string;
            action__addAccount: string;
        };
        organizationSwitcher: {
            personalWorkspace: string;
            notSelected: string;
            action__createOrganization: string;
            action__manageOrganization: string;
            action__invitationAccept: string;
            action__suggestionsAccept: string;
            suggestionsAcceptedLabel: string;
        };
        impersonationFab: {
            title: string;
            action__signOut: string;
        };
        organizationProfile: {
            badge__unverified: string;
            badge__automaticInvitation: string;
            badge__automaticSuggestion: string;
            badge__manualInvitation: string;
            start: {
                headerTitle__members: string;
                headerTitle__settings: string;
                headerSubtitle__members: string;
                headerSubtitle__settings: string;
            };
            profilePage: {
                title: string;
                subtitle: string;
                successMessage: string;
                dangerSection: {
                    title: string;
                    leaveOrganization: {
                        title: string;
                        messageLine1: string;
                        messageLine2: string;
                        actionDescription: string;
                        successMessage: string;
                    };
                    deleteOrganization: {
                        title: string;
                        messageLine1: string;
                        messageLine2: string;
                        actionDescription: string;
                        successMessage: string;
                    };
                };
                domainSection: {
                    title: string;
                    subtitle: string;
                    primaryButton: string;
                    unverifiedDomain_menuAction__verify: string;
                    unverifiedDomain_menuAction__remove: string;
                };
            };
            createDomainPage: {
                title: string;
                subtitle: string;
            };
            verifyDomainPage: {
                title: string;
                subtitle: string;
                subtitleVerificationCodeScreen: string;
                formTitle: string;
                formSubtitle: string;
                resendButton: string;
            };
            verifiedDomainPage: {
                subtitle: string;
                start: {
                    headerTitle__enrollment: string;
                    headerTitle__danger: string;
                };
                enrollmentTab: {
                    subtitle: string;
                    manualInvitationOption__label: string;
                    manualInvitationOption__description: string;
                    automaticInvitationOption__label: string;
                    automaticInvitationOption__description: string;
                    automaticSuggestionOption__label: string;
                    automaticSuggestionOption__description: string;
                    formButton__save: string;
                    calloutInfoLabel: string;
                    calloutInvitationCountLabel: string;
                    calloutSuggestionCountLabel: string;
                };
                dangerTab: {
                    removeDomainTitle: string;
                    removeDomainSubtitle: string;
                    removeDomainActionLabel__remove: string;
                    calloutInfoLabel: string;
                };
            };
            removeDomainPage: {
                title: string;
                messageLine1: string;
                messageLine2: string;
                successMessage: string;
            };
            invitePage: {
                title: string;
                subtitle: string;
                successMessage: string;
                detailsTitle__inviteFailed: string;
                formButtonPrimary__continue: string;
            };
            membersPage: {
                detailsTitle__emptyRow: string;
                action__invite: string;
                start: {
                    headerTitle__active: string;
                    headerTitle__members: string;
                    headerTitle__invited: string;
                    headerTitle__invitations: string;
                    headerTitle__requests: string;
                };
                activeMembersTab: {
                    tableHeader__user: string;
                    tableHeader__joined: string;
                    tableHeader__role: string;
                    tableHeader__actions: string;
                    menuAction__remove: string;
                };
                invitedMembersTab: {
                    tableHeader__invited: string;
                    menuAction__revoke: string;
                };
                invitationsTab: {
                    table__emptyRow: string;
                    manualInvitations: {
                        headerTitle: string;
                        headerSubtitle: string;
                    };
                    autoInvitations: {
                        headerTitle: string;
                        headerSubtitle: string;
                        primaryButton: string;
                    };
                };
                requestsTab: {
                    tableHeader__requested: string;
                    menuAction__approve: string;
                    menuAction__reject: string;
                    table__emptyRow: string;
                    requests: {
                        headerTitle: string;
                        headerSubtitle: string;
                    };
                    autoSuggestions: {
                        headerTitle: string;
                        headerSubtitle: string;
                        primaryButton: string;
                    };
                };
            };
        };
        createOrganization: {
            title: string;
            formButtonSubmit: string;
            subtitle: string;
            invitePage: {
                formButtonReset: string;
            };
        };
        organizationList: {
            createOrganization: string;
            title: string;
            titleWithoutPersonal: string;
            subtitle: string;
            action__createOrganization: string;
            action__invitationAccept: string;
            action__suggestionsAccept: string;
            suggestionsAcceptedLabel: string;
            invitationAcceptedLabel: string;
        };
        unstable__errors: {
            form_identifier_exists__email_address: string;
            form_identifier_exists__phone_number: string;
            form_identifier_exists__username: string;
            identification_deletion_failed: string;
            phone_number_exists: string;
            form_identifier_not_found: string;
            captcha_unavailable: string;
            captcha_invalid: string;
            form_password_pwned: string;
            form_password_pwned__sign_in: string;
            form_username_invalid_length: string;
            form_username_invalid_character: string;
            form_param_format_invalid: string;
            form_param_format_invalid__email_address: string;
            form_password_length_too_short: string;
            form_param_nil: string;
            form_code_incorrect: string;
            form_password_incorrect: string;
            form_password_validation_failed: string;
            not_allowed_access: string;
            form_identifier_exists: string;
            form_password_not_strong_enough: string;
            form_password_size_in_bytes_exceeded: string;
            passwordComplexity: {
                sentencePrefix: string;
                minimumLength: string;
                maximumLength: string;
                requireNumbers: string;
                requireLowercase: string;
                requireUppercase: string;
                requireSpecialCharacter: string;
            };
            zxcvbn: {
                notEnough: string;
                couldBeStronger: string;
                goodPassword: string;
                warnings: {
                    straightRow: string;
                    keyPattern: string;
                    simpleRepeat: string;
                    extendedRepeat: string;
                    sequences: string;
                    recentYears: string;
                    dates: string;
                    topTen: string;
                    topHundred: string;
                    common: string;
                    similarToCommon: string;
                    wordByItself: string;
                    namesByThemselves: string;
                    commonNames: string;
                    userInputs: string;
                    pwned: string;
                };
                suggestions: {
                    l33t: string;
                    reverseWords: string;
                    allUppercase: string;
                    capitalization: string;
                    dates: string;
                    recentYears: string;
                    associatedYears: string;
                    sequences: string;
                    repeated: string;
                    longerKeyboardPattern: string;
                    anotherWord: string;
                    useWords: string;
                    noNeed: string;
                    pwned: string;
                };
            };
            form_param_max_length_exceeded: string;
        } & Partial<Record<"form_identifier_exists__email_address" | "form_identifier_exists__phone_number" | "form_identifier_exists__username" | "form_param_format_invalid__email_address" | "form_identifier_exists__email_address__code" | "form_identifier_exists__phone_number__code" | "form_identifier_exists__username__code" | "identification_deletion_failed__code" | "phone_number_exists__code" | "form_identifier_not_found__code" | "captcha_unavailable__code" | "captcha_invalid__code" | "form_password_pwned__code" | "form_password_pwned__sign_in__code" | "form_username_invalid_length__code" | "form_username_invalid_character__code" | "form_param_format_invalid__code" | "form_param_format_invalid__email_address__code" | "form_password_length_too_short__code" | "form_param_nil__code" | "form_code_incorrect__code" | "form_password_incorrect__code" | "form_password_validation_failed__code" | "not_allowed_access__code" | "form_identifier_exists__code" | "form_password_not_strong_enough__code" | "form_password_size_in_bytes_exceeded__code" | "passwordComplexity__code" | "zxcvbn__code" | "form_param_max_length_exceeded__code" | "form_identifier_exists__email_address__name" | "form_identifier_exists__phone_number__name" | "form_identifier_exists__username__name" | "identification_deletion_failed__name" | "phone_number_exists__name" | "form_identifier_not_found__name" | "captcha_unavailable__name" | "captcha_invalid__name" | "form_password_pwned__name" | "form_password_pwned__sign_in__name" | "form_username_invalid_length__name" | "form_username_invalid_character__name" | "form_param_format_invalid__name" | "form_param_format_invalid__email_address__name" | "form_password_length_too_short__name" | "form_param_nil__name" | "form_code_incorrect__name" | "form_password_incorrect__name" | "form_password_validation_failed__name" | "not_allowed_access__name" | "form_identifier_exists__name" | "form_password_not_strong_enough__name" | "form_password_size_in_bytes_exceeded__name" | "passwordComplexity__name" | "zxcvbn__name" | "form_param_max_length_exceeded__name" | "form_identifier_exists__email_address__slug" | "form_identifier_exists__phone_number__slug" | "form_identifier_exists__username__slug" | "identification_deletion_failed__slug" | "phone_number_exists__slug" | "form_identifier_not_found__slug" | "captcha_unavailable__slug" | "captcha_invalid__slug" | "form_password_pwned__slug" | "form_password_pwned__sign_in__slug" | "form_username_invalid_length__slug" | "form_username_invalid_character__slug" | "form_param_format_invalid__slug" | "form_param_format_invalid__email_address__slug" | "form_password_length_too_short__slug" | "form_param_nil__slug" | "form_code_incorrect__slug" | "form_password_incorrect__slug" | "form_password_validation_failed__slug" | "not_allowed_access__slug" | "form_identifier_exists__slug" | "form_password_not_strong_enough__slug" | "form_password_size_in_bytes_exceeded__slug" | "passwordComplexity__slug" | "zxcvbn__slug" | "form_param_max_length_exceeded__slug" | "form_identifier_exists__email_address__password" | "form_identifier_exists__phone_number__password" | "form_identifier_exists__username__password" | "identification_deletion_failed__password" | "phone_number_exists__password" | "form_identifier_not_found__password" | "captcha_unavailable__password" | "captcha_invalid__password" | "form_password_pwned__password" | "form_password_pwned__sign_in__password" | "form_username_invalid_length__password" | "form_username_invalid_character__password" | "form_param_format_invalid__password" | "form_param_format_invalid__email_address__password" | "form_password_length_too_short__password" | "form_param_nil__password" | "form_code_incorrect__password" | "form_password_incorrect__password" | "form_password_validation_failed__password" | "not_allowed_access__password" | "form_identifier_exists__password" | "form_password_not_strong_enough__password" | "form_password_size_in_bytes_exceeded__password" | "passwordComplexity__password" | "zxcvbn__password" | "form_param_max_length_exceeded__password" | "form_identifier_exists__email_address__identifier" | "form_identifier_exists__phone_number__identifier" | "form_identifier_exists__username__identifier" | "identification_deletion_failed__identifier" | "phone_number_exists__identifier" | "form_identifier_not_found__identifier" | "captcha_unavailable__identifier" | "captcha_invalid__identifier" | "form_password_pwned__identifier" | "form_password_pwned__sign_in__identifier" | "form_username_invalid_length__identifier" | "form_username_invalid_character__identifier" | "form_param_format_invalid__identifier" | "form_param_format_invalid__email_address__identifier" | "form_password_length_too_short__identifier" | "form_param_nil__identifier" | "form_code_incorrect__identifier" | "form_password_incorrect__identifier" | "form_password_validation_failed__identifier" | "not_allowed_access__identifier" | "form_identifier_exists__identifier" | "form_password_not_strong_enough__identifier" | "form_password_size_in_bytes_exceeded__identifier" | "passwordComplexity__identifier" | "zxcvbn__identifier" | "form_param_max_length_exceeded__identifier" | "form_identifier_exists__email_address__username" | "form_identifier_exists__phone_number__username" | "form_identifier_exists__username__username" | "identification_deletion_failed__username" | "phone_number_exists__username" | "form_identifier_not_found__username" | "captcha_unavailable__username" | "captcha_invalid__username" | "form_password_pwned__username" | "form_password_pwned__sign_in__username" | "form_username_invalid_length__username" | "form_username_invalid_character__username" | "form_param_format_invalid__username" | "form_param_format_invalid__email_address__username" | "form_password_length_too_short__username" | "form_param_nil__username" | "form_code_incorrect__username" | "form_password_incorrect__username" | "form_password_validation_failed__username" | "not_allowed_access__username" | "form_password_not_strong_enough__username" | "form_password_size_in_bytes_exceeded__username" | "passwordComplexity__username" | "zxcvbn__username" | "form_param_max_length_exceeded__username" | "form_identifier_exists__email_address__first_name" | "form_identifier_exists__phone_number__first_name" | "form_identifier_exists__username__first_name" | "identification_deletion_failed__first_name" | "phone_number_exists__first_name" | "form_identifier_not_found__first_name" | "captcha_unavailable__first_name" | "captcha_invalid__first_name" | "form_password_pwned__first_name" | "form_password_pwned__sign_in__first_name" | "form_username_invalid_length__first_name" | "form_username_invalid_character__first_name" | "form_param_format_invalid__first_name" | "form_param_format_invalid__email_address__first_name" | "form_password_length_too_short__first_name" | "form_param_nil__first_name" | "form_code_incorrect__first_name" | "form_password_incorrect__first_name" | "form_password_validation_failed__first_name" | "not_allowed_access__first_name" | "form_identifier_exists__first_name" | "form_password_not_strong_enough__first_name" | "form_password_size_in_bytes_exceeded__first_name" | "passwordComplexity__first_name" | "zxcvbn__first_name" | "form_param_max_length_exceeded__first_name" | "form_identifier_exists__email_address__last_name" | "form_identifier_exists__phone_number__last_name" | "form_identifier_exists__username__last_name" | "identification_deletion_failed__last_name" | "phone_number_exists__last_name" | "form_identifier_not_found__last_name" | "captcha_unavailable__last_name" | "captcha_invalid__last_name" | "form_password_pwned__last_name" | "form_password_pwned__sign_in__last_name" | "form_username_invalid_length__last_name" | "form_username_invalid_character__last_name" | "form_param_format_invalid__last_name" | "form_param_format_invalid__email_address__last_name" | "form_password_length_too_short__last_name" | "form_param_nil__last_name" | "form_code_incorrect__last_name" | "form_password_incorrect__last_name" | "form_password_validation_failed__last_name" | "not_allowed_access__last_name" | "form_identifier_exists__last_name" | "form_password_not_strong_enough__last_name" | "form_password_size_in_bytes_exceeded__last_name" | "passwordComplexity__last_name" | "zxcvbn__last_name" | "form_param_max_length_exceeded__last_name" | "form_identifier_exists__email_address__email_address" | "form_identifier_exists__phone_number__email_address" | "form_identifier_exists__username__email_address" | "identification_deletion_failed__email_address" | "phone_number_exists__email_address" | "form_identifier_not_found__email_address" | "captcha_unavailable__email_address" | "captcha_invalid__email_address" | "form_password_pwned__email_address" | "form_password_pwned__sign_in__email_address" | "form_username_invalid_length__email_address" | "form_username_invalid_character__email_address" | "form_param_format_invalid__email_address__email_address" | "form_password_length_too_short__email_address" | "form_param_nil__email_address" | "form_code_incorrect__email_address" | "form_password_incorrect__email_address" | "form_password_validation_failed__email_address" | "not_allowed_access__email_address" | "form_password_not_strong_enough__email_address" | "form_password_size_in_bytes_exceeded__email_address" | "passwordComplexity__email_address" | "zxcvbn__email_address" | "form_param_max_length_exceeded__email_address" | "form_identifier_exists__email_address__phone_number" | "form_identifier_exists__phone_number__phone_number" | "form_identifier_exists__username__phone_number" | "identification_deletion_failed__phone_number" | "phone_number_exists__phone_number" | "form_identifier_not_found__phone_number" | "captcha_unavailable__phone_number" | "captcha_invalid__phone_number" | "form_password_pwned__phone_number" | "form_password_pwned__sign_in__phone_number" | "form_username_invalid_length__phone_number" | "form_username_invalid_character__phone_number" | "form_param_format_invalid__phone_number" | "form_param_format_invalid__email_address__phone_number" | "form_password_length_too_short__phone_number" | "form_param_nil__phone_number" | "form_code_incorrect__phone_number" | "form_password_incorrect__phone_number" | "form_password_validation_failed__phone_number" | "not_allowed_access__phone_number" | "form_password_not_strong_enough__phone_number" | "form_password_size_in_bytes_exceeded__phone_number" | "passwordComplexity__phone_number" | "zxcvbn__phone_number" | "form_param_max_length_exceeded__phone_number" | "form_identifier_exists__email_address__current_password" | "form_identifier_exists__phone_number__current_password" | "form_identifier_exists__username__current_password" | "identification_deletion_failed__current_password" | "phone_number_exists__current_password" | "form_identifier_not_found__current_password" | "captcha_unavailable__current_password" | "captcha_invalid__current_password" | "form_password_pwned__current_password" | "form_password_pwned__sign_in__current_password" | "form_username_invalid_length__current_password" | "form_username_invalid_character__current_password" | "form_param_format_invalid__current_password" | "form_param_format_invalid__email_address__current_password" | "form_password_length_too_short__current_password" | "form_param_nil__current_password" | "form_code_incorrect__current_password" | "form_password_incorrect__current_password" | "form_password_validation_failed__current_password" | "not_allowed_access__current_password" | "form_identifier_exists__current_password" | "form_password_not_strong_enough__current_password" | "form_password_size_in_bytes_exceeded__current_password" | "passwordComplexity__current_password" | "zxcvbn__current_password" | "form_param_max_length_exceeded__current_password" | "form_identifier_exists__email_address__new_password" | "form_identifier_exists__phone_number__new_password" | "form_identifier_exists__username__new_password" | "identification_deletion_failed__new_password" | "phone_number_exists__new_password" | "form_identifier_not_found__new_password" | "captcha_unavailable__new_password" | "captcha_invalid__new_password" | "form_password_pwned__new_password" | "form_password_pwned__sign_in__new_password" | "form_username_invalid_length__new_password" | "form_username_invalid_character__new_password" | "form_param_format_invalid__new_password" | "form_param_format_invalid__email_address__new_password" | "form_password_length_too_short__new_password" | "form_param_nil__new_password" | "form_code_incorrect__new_password" | "form_password_incorrect__new_password" | "form_password_validation_failed__new_password" | "not_allowed_access__new_password" | "form_identifier_exists__new_password" | "form_password_not_strong_enough__new_password" | "form_password_size_in_bytes_exceeded__new_password" | "passwordComplexity__new_password" | "zxcvbn__new_password" | "form_param_max_length_exceeded__new_password" | "form_identifier_exists__email_address__sign_out_of_other_sessions" | "form_identifier_exists__phone_number__sign_out_of_other_sessions" | "form_identifier_exists__username__sign_out_of_other_sessions" | "identification_deletion_failed__sign_out_of_other_sessions" | "phone_number_exists__sign_out_of_other_sessions" | "form_identifier_not_found__sign_out_of_other_sessions" | "captcha_unavailable__sign_out_of_other_sessions" | "captcha_invalid__sign_out_of_other_sessions" | "form_password_pwned__sign_out_of_other_sessions" | "form_password_pwned__sign_in__sign_out_of_other_sessions" | "form_username_invalid_length__sign_out_of_other_sessions" | "form_username_invalid_character__sign_out_of_other_sessions" | "form_param_format_invalid__sign_out_of_other_sessions" | "form_param_format_invalid__email_address__sign_out_of_other_sessions" | "form_password_length_too_short__sign_out_of_other_sessions" | "form_param_nil__sign_out_of_other_sessions" | "form_code_incorrect__sign_out_of_other_sessions" | "form_password_incorrect__sign_out_of_other_sessions" | "form_password_validation_failed__sign_out_of_other_sessions" | "not_allowed_access__sign_out_of_other_sessions" | "form_identifier_exists__sign_out_of_other_sessions" | "form_password_not_strong_enough__sign_out_of_other_sessions" | "form_password_size_in_bytes_exceeded__sign_out_of_other_sessions" | "passwordComplexity__sign_out_of_other_sessions" | "zxcvbn__sign_out_of_other_sessions" | "form_param_max_length_exceeded__sign_out_of_other_sessions" | "form_identifier_exists__email_address__confirm_password" | "form_identifier_exists__phone_number__confirm_password" | "form_identifier_exists__username__confirm_password" | "identification_deletion_failed__confirm_password" | "phone_number_exists__confirm_password" | "form_identifier_not_found__confirm_password" | "captcha_unavailable__confirm_password" | "captcha_invalid__confirm_password" | "form_password_pwned__confirm_password" | "form_password_pwned__sign_in__confirm_password" | "form_username_invalid_length__confirm_password" | "form_username_invalid_character__confirm_password" | "form_param_format_invalid__confirm_password" | "form_param_format_invalid__email_address__confirm_password" | "form_password_length_too_short__confirm_password" | "form_param_nil__confirm_password" | "form_code_incorrect__confirm_password" | "form_password_incorrect__confirm_password" | "form_password_validation_failed__confirm_password" | "not_allowed_access__confirm_password" | "form_identifier_exists__confirm_password" | "form_password_not_strong_enough__confirm_password" | "form_password_size_in_bytes_exceeded__confirm_password" | "passwordComplexity__confirm_password" | "zxcvbn__confirm_password" | "form_param_max_length_exceeded__confirm_password" | "form_identifier_exists__email_address__delete_confirmation" | "form_identifier_exists__phone_number__delete_confirmation" | "form_identifier_exists__username__delete_confirmation" | "identification_deletion_failed__delete_confirmation" | "phone_number_exists__delete_confirmation" | "form_identifier_not_found__delete_confirmation" | "captcha_unavailable__delete_confirmation" | "captcha_invalid__delete_confirmation" | "form_password_pwned__delete_confirmation" | "form_password_pwned__sign_in__delete_confirmation" | "form_username_invalid_length__delete_confirmation" | "form_username_invalid_character__delete_confirmation" | "form_param_format_invalid__delete_confirmation" | "form_param_format_invalid__email_address__delete_confirmation" | "form_password_length_too_short__delete_confirmation" | "form_param_nil__delete_confirmation" | "form_code_incorrect__delete_confirmation" | "form_password_incorrect__delete_confirmation" | "form_password_validation_failed__delete_confirmation" | "not_allowed_access__delete_confirmation" | "form_identifier_exists__delete_confirmation" | "form_password_not_strong_enough__delete_confirmation" | "form_password_size_in_bytes_exceeded__delete_confirmation" | "passwordComplexity__delete_confirmation" | "zxcvbn__delete_confirmation" | "form_param_max_length_exceeded__delete_confirmation" | "form_identifier_exists__email_address__delete_organization_confirmation" | "form_identifier_exists__phone_number__delete_organization_confirmation" | "form_identifier_exists__username__delete_organization_confirmation" | "identification_deletion_failed__delete_organization_confirmation" | "phone_number_exists__delete_organization_confirmation" | "form_identifier_not_found__delete_organization_confirmation" | "captcha_unavailable__delete_organization_confirmation" | "captcha_invalid__delete_organization_confirmation" | "form_password_pwned__delete_organization_confirmation" | "form_password_pwned__sign_in__delete_organization_confirmation" | "form_username_invalid_length__delete_organization_confirmation" | "form_username_invalid_character__delete_organization_confirmation" | "form_param_format_invalid__delete_organization_confirmation" | "form_param_format_invalid__email_address__delete_organization_confirmation" | "form_password_length_too_short__delete_organization_confirmation" | "form_param_nil__delete_organization_confirmation" | "form_code_incorrect__delete_organization_confirmation" | "form_password_incorrect__delete_organization_confirmation" | "form_password_validation_failed__delete_organization_confirmation" | "not_allowed_access__delete_organization_confirmation" | "form_identifier_exists__delete_organization_confirmation" | "form_password_not_strong_enough__delete_organization_confirmation" | "form_password_size_in_bytes_exceeded__delete_organization_confirmation" | "passwordComplexity__delete_organization_confirmation" | "zxcvbn__delete_organization_confirmation" | "form_param_max_length_exceeded__delete_organization_confirmation" | "form_identifier_exists__email_address__enrollment_mode" | "form_identifier_exists__phone_number__enrollment_mode" | "form_identifier_exists__username__enrollment_mode" | "identification_deletion_failed__enrollment_mode" | "phone_number_exists__enrollment_mode" | "form_identifier_not_found__enrollment_mode" | "captcha_unavailable__enrollment_mode" | "captcha_invalid__enrollment_mode" | "form_password_pwned__enrollment_mode" | "form_password_pwned__sign_in__enrollment_mode" | "form_username_invalid_length__enrollment_mode" | "form_username_invalid_character__enrollment_mode" | "form_param_format_invalid__enrollment_mode" | "form_param_format_invalid__email_address__enrollment_mode" | "form_password_length_too_short__enrollment_mode" | "form_param_nil__enrollment_mode" | "form_code_incorrect__enrollment_mode" | "form_password_incorrect__enrollment_mode" | "form_password_validation_failed__enrollment_mode" | "not_allowed_access__enrollment_mode" | "form_identifier_exists__enrollment_mode" | "form_password_not_strong_enough__enrollment_mode" | "form_password_size_in_bytes_exceeded__enrollment_mode" | "passwordComplexity__enrollment_mode" | "zxcvbn__enrollment_mode" | "form_param_max_length_exceeded__enrollment_mode" | "form_identifier_exists__email_address__affiliation_email_address" | "form_identifier_exists__phone_number__affiliation_email_address" | "form_identifier_exists__username__affiliation_email_address" | "identification_deletion_failed__affiliation_email_address" | "phone_number_exists__affiliation_email_address" | "form_identifier_not_found__affiliation_email_address" | "captcha_unavailable__affiliation_email_address" | "captcha_invalid__affiliation_email_address" | "form_password_pwned__affiliation_email_address" | "form_password_pwned__sign_in__affiliation_email_address" | "form_username_invalid_length__affiliation_email_address" | "form_username_invalid_character__affiliation_email_address" | "form_param_format_invalid__affiliation_email_address" | "form_param_format_invalid__email_address__affiliation_email_address" | "form_password_length_too_short__affiliation_email_address" | "form_param_nil__affiliation_email_address" | "form_code_incorrect__affiliation_email_address" | "form_password_incorrect__affiliation_email_address" | "form_password_validation_failed__affiliation_email_address" | "not_allowed_access__affiliation_email_address" | "form_identifier_exists__affiliation_email_address" | "form_password_not_strong_enough__affiliation_email_address" | "form_password_size_in_bytes_exceeded__affiliation_email_address" | "passwordComplexity__affiliation_email_address" | "zxcvbn__affiliation_email_address" | "form_param_max_length_exceeded__affiliation_email_address" | "form_identifier_exists__email_address__delete_existing_invitations_suggestions" | "form_identifier_exists__phone_number__delete_existing_invitations_suggestions" | "form_identifier_exists__username__delete_existing_invitations_suggestions" | "identification_deletion_failed__delete_existing_invitations_suggestions" | "phone_number_exists__delete_existing_invitations_suggestions" | "form_identifier_not_found__delete_existing_invitations_suggestions" | "captcha_unavailable__delete_existing_invitations_suggestions" | "captcha_invalid__delete_existing_invitations_suggestions" | "form_password_pwned__delete_existing_invitations_suggestions" | "form_password_pwned__sign_in__delete_existing_invitations_suggestions" | "form_username_invalid_length__delete_existing_invitations_suggestions" | "form_username_invalid_character__delete_existing_invitations_suggestions" | "form_param_format_invalid__delete_existing_invitations_suggestions" | "form_param_format_invalid__email_address__delete_existing_invitations_suggestions" | "form_password_length_too_short__delete_existing_invitations_suggestions" | "form_param_nil__delete_existing_invitations_suggestions" | "form_code_incorrect__delete_existing_invitations_suggestions" | "form_password_incorrect__delete_existing_invitations_suggestions" | "form_password_validation_failed__delete_existing_invitations_suggestions" | "not_allowed_access__delete_existing_invitations_suggestions" | "form_identifier_exists__delete_existing_invitations_suggestions" | "form_password_not_strong_enough__delete_existing_invitations_suggestions" | "form_password_size_in_bytes_exceeded__delete_existing_invitations_suggestions" | "passwordComplexity__delete_existing_invitations_suggestions" | "zxcvbn__delete_existing_invitations_suggestions" | "form_param_max_length_exceeded__delete_existing_invitations_suggestions", string>>;
        dates: {
            previous6Days: string;
            lastDay: string;
            sameDay: string;
            nextDay: string;
            next6Days: string;
            numeric: string;
        };
        maintenanceMode: string;
    }> | undefined;
    navigate?: ((to: string) => unknown) | undefined;
    polling?: boolean | undefined;
    selectInitialSession?: ((client: import("@clerk/types").ClientResource) => import("@clerk/types").ActiveSessionResource | null) | undefined;
    standardBrowser?: boolean | undefined;
    supportEmail?: string | undefined;
    touchSession?: boolean | undefined;
    allowedRedirectOrigins?: (string | RegExp)[] | undefined;
    isInterstitial?: boolean | undefined;
    Clerk?: import("@clerk/clerk-react").ClerkProp;
    clerkJSVariant?: "" | "headless" | undefined;
    __unstable_invokeMiddlewareOnAuthStateChange?: boolean | undefined;
};
//# sourceMappingURL=mergeNextClerkPropsWithEnv.d.ts.map