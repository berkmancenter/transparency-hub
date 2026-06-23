declare module 'react-scrollama' {
    import { ReactNode } from 'react';

    export interface StepData {
        data: any;
        direction: 'up' | 'down';
        element: HTMLElement;
        index: number;
    }

    export interface ScrollamaProps {
        offset?: number;
        threshold?: number;
        onStepEnter?: (step: StepData) => void;
        onStepExit?: (step: StepData) => void;
        onStepProgress?: (step: StepData & { progress: number }) => void;
        debug?: boolean;
        children: ReactNode;
    }

    export interface StepProps {
        data: any;
        children: ReactNode;
    }

    export const Scrollama: React.FC<ScrollamaProps>;
    export const Step: React.FC<StepProps>;
}