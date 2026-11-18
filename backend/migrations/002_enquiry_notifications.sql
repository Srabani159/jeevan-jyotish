ALTER TABLE enquiries ADD COLUMN is_read TINYINT(1) NOT NULL DEFAULT 0 AFTER status;

CREATE INDEX idx_enquiries_unread ON enquiries (is_read, created_at);

UPDATE enquiries SET is_read = 1 WHERE status <> 'new'
