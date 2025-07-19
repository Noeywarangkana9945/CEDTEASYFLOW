-- สร้าง flowchart ใหม่
INSERT INTO flowcharts (name, description)
VALUES ('User Login Flow', 'Flowchart สำหรับระบบล็อกอิน');

-- เพิ่ม nodes
INSERT INTO nodes (flowchart_id, type, label, position_x, position_y)
VALUES
  (1, 'start', 'Start', 100, 100),
  (1, 'process', 'Enter Email', 200, 100),
  (1, 'decision', 'Valid Email?', 300, 100),
  (1, 'end', 'End', 400, 100);

-- เพิ่ม edges
INSERT INTO edges (flowchart_id, from_node_id, to_node_id, label)
VALUES
  (1, 1, 2, NULL),
  (1, 2, 3, NULL),
  (1, 3, 4, 'Yes'),
  (1, 3, 2, 'No');
