// export const LogPrefix = {
//     format(props: { moduleName?: string; functionName?: string; location?: string }): string {
//         const parts: string[] = [];
//         if (props.moduleName) {
//             parts.push(props.moduleName);
//         }
//         if (props.functionName) {
//             parts.push(`#${props.functionName}`);
//         }
//         if (props.location) {
//             parts.push(`@${props.location}`);
//         }
//         if (parts.length === 0) {
//             return '';
//         }
//         return `${parts.join('')}: `;
//     },
//     create(props: { moduleName: string }): { moduleName: string; logPrefix: string } {
//         const logPrefix = LogPrefix.format({ moduleName: props.moduleName });
//         return { moduleName: props.moduleName, logPrefix };
//     },
// };

// export const Location = {
//     format(props: { moduleName?: string; at?: string; tag?: string }): string {
//         const parts: string[] = [];
//         if (props.moduleName) {
//             parts.push(props.moduleName);
//         }
//         if (props.at) {
//             parts.push(` >> ${props.at}`);
//         }
//         if (props.tag) {
//             parts.push(` [${props.tag}]`);
//         }
//         if (parts.length === 0) {
//             return '';
//         }
//         return `${parts.join('')}`;
//     },
// };

// // export type LogPrefix = {
// //     add(props: { moduleName?: string; functionName?: string; location?: string }): LogPrefix;
// //     build(): string;
// // };

// // export function logPrefixBuilder(props: {
// //     moduleName?: string;
// //     functionName?: string;
// //     location?: string;
// // }): LogPrefix {
// //     let moduleName: string = props.moduleName ?? '';
// //     let functionName: string = props.functionName ?? '';
// //     let location: string = props.location ?? '';
// //     return {
// //         add(props) {
// //             if (props.moduleName !== undefined) moduleName = props.moduleName;
// //             if (props.functionName !== undefined) functionName = props.functionName;
// //             if (props.location !== undefined) location = props.location;
// //             return this;
// //         },
// //         build() {
// //             const logPrefix: string[] = [];
// //             if (moduleName) {
// //                 logPrefix.push(moduleName);
// //             }
// //             if (functionName) {
// //                 logPrefix.push(`#${functionName}`);
// //             }
// //             if (location) {
// //                 logPrefix.push(`@${location}`);
// //             }
// //             logPrefix.push(': ');
// //             return logPrefix.join('');
// //         },
// //     };
// // }

// // export function formatLogPrefix(props: {
// //     moduleName?: string;
// //     functionName?: string;
// //     location?: string;
// // }): string {
// //     const logPrefix: string[] = [];
// //     if (props.moduleName) {
// //         logPrefix.push(props.moduleName);
// //     }
// //     if (props.functionName) {
// //         logPrefix.push(`#${props.functionName}`);
// //     }
// //     if (location) {
// //         logPrefix.push(`@${location}`);
// //     }
// //     logPrefix.push(': ');
// //     return logPrefix.join('');
// // }
