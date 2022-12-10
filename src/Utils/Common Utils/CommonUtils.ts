import { useEffect } from 'react';

export default class CommonUtils {
    public static useOutsideClick(
        refs: React.MutableRefObject<any>[],
        onOutsideClick: (ev) => void,
        getContainer?,
    ) {
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                const container = getContainer?.();
                const containers = [
                    ...refs,
                    ...(getContainer && container ? [{ current: container }] : []),
                ];
                const outsideRefs = containers.every(
                    (ref) => ref.current && !ref.current.contains(event.target),
                );
                if (outsideRefs) {
                    // event.stopPropagation();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    onOutsideClick(event);
                }
            };

            window.addEventListener('click', handleClickOutside, true);
            window.addEventListener('mousedown', handleClickOutside, true);
            window.addEventListener('contextmenu', handleClickOutside, true);

            return () => {
                window.removeEventListener('click', handleClickOutside, true);
                window.removeEventListener('mousedown', handleClickOutside, true);
                window.removeEventListener('contextmenu', handleClickOutside, true);
            };
        }, [refs, onOutsideClick]);
    }

    public static getAge(dateString: string) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    public static getFormattedDob(dateString: string) {
        const birthDate = new Date(dateString).toDateString().split(' ');
        const [weekDay, month, date, year] = birthDate;
        return `${date} ${month}, ${year}`;
    }
}
