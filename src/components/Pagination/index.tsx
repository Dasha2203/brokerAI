import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import LeftArrowIcon from '@/icons/LeftArrowIcon';
import RightArowIcon from '@/icons/RightArrowIcon';
import Button from '../buttons/Button';
import { Props } from './types';

const COUNT_VISIBLE = 4;

const Pagination = ({ total, count, active, className, setActive }: Props) => {
  const t = useTranslations('pagination');
  const countPages = useMemo(() => Math.ceil(total / count), [count, total]);
  const from = (active - 1) * count + 1;
  const to = (from + count >= total ? total : from + count) - 1;

  const pages = useMemo(() => {
    let start = Math.max(1, active - Math.floor(COUNT_VISIBLE / 2));
    let end = start + COUNT_VISIBLE - 1;

    if (end > countPages) {
      end = countPages;
      start = Math.max(1, end - COUNT_VISIBLE + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [active, total, countPages]);

  function handleChangePage(page: number) {
    setActive(page);
  }

  if (total < count || countPages <= 1) return null;

  return (
    <div className={clsx('flex justify-between items-center', className)}>
      <div className="text-base">
        {t.rich('infoShowResult', {
          from,
          to,
          total,
          bold: (chunks) => <span className="font-bold">{chunks}</span>,
        })}
      </div>
      <div className={clsx('flex ml-auto items-center w-fit gap-2.5')}>
        {countPages > COUNT_VISIBLE ? (
          <Button
            as="button"
            className="md:px-[13px] aspect-square"
            disabled={active === 1}
            onClick={() => handleChangePage(active - 1)}
          >
            <LeftArrowIcon className="w-6 h-6" />
          </Button>
        ) : null}

        <div
          className={clsx(
            'flex items-center justify-center rounded-[14px] max-w-lg ',
            // light
            'border border-gray-200',
            // dark
            'dark:bg-violet-500',
          )}
        >
          {pages.map((i) => (
            <Button
              key={i}
              as="button"
              uiColor={i === active ? 'primary' : undefined}
              variant="contained"
              className="w-full aspect-square"
              onClick={() => handleChangePage(i)}
            >
              {i}
            </Button>
          ))}
        </div>
        {countPages > COUNT_VISIBLE ? (
          <Button
            as="button"
            className="md:px-[13px] aspect-square"
            disabled={active === countPages}
            onClick={() => handleChangePage(active + 1)}
          >
            <RightArowIcon className="w-6 h-6" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
