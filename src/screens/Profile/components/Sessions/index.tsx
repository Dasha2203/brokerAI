import Box from '@/components/ui/Box';
import { Props } from './types';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { getSessions, removeSession, Session } from '@/api/user';
import Button from '@/components/buttons/Button';
import { useTranslations } from 'next-intl';

const Sessions = ({ className }: Props) => {
  const t = useTranslations('profile');
  const [sessions, setSessions] = useState<Session[]>([]);

  async function fetchSession() {
    try {
      const data = await getSessions();
      setSessions(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveSession(sessionId: string) {
    try {
      await removeSession({ sessionId });
      setSessions(sessions.filter((i) => i.sessionId !== sessionId));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <Box className={clsx(className)}>
      <div className="font-bold text-2xl">{t('lastSessions')}</div>

      {sessions.length ? (
        <ul className="mt-8">
          {sessions.map((session, idx) => (
            <li key={idx} className="my-2 py-1 flex justify-between">
              <span className="uppercase text-gray-300 font-bold">IP:</span>
              <div className="flex gap-3 items-center">
                <span>{session.deviceIp}</span>
                <Button
                  as="button"
                  size="sm"
                  uiColor="danger"
                  variant="contained"
                  onClick={() => handleRemoveSession(session.sessionId)}
                >
                  {t('action.revoke')}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        'No sessions'
      )}
    </Box>
  );
};

export default Sessions;
