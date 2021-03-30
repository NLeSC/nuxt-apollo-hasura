CREATE OR REPLACE FUNCTION public.aggregate_features(start_time double precision, end_time double precision, resolution numeric, hash character varying)
 RETURNS SETOF agg_result
 LANGUAGE sql
 STABLE
AS $function$
select
  min(timestamp) as min_timestamp,
  avg("AU01_r"),
  avg("AU02_r"),
  avg("AU04_r"),
  avg("AU05_r"),
  avg("AU06_r"),
  avg("AU07_r"),
  avg("AU09_r"),
  avg("AU10_r"),
  avg("AU12_r"),
  avg("AU14_r"),
  avg("AU15_r"),
  avg("AU17_r"),
  avg("AU20_r"),
  avg("AU23_r"),
  avg("AU25_r"),
  avg("AU26_r"),
  avg("AU45_r"),
  avg("AU01_c"),
  avg("AU02_c"),
  avg("AU04_c"),
  avg("AU05_c"),
  avg("AU06_c"),
  avg("AU07_c"),
  avg("AU09_c"),
  avg("AU10_c"),
  avg("AU12_c"),
  avg("AU14_c"),
  avg("AU15_c"),
  avg("AU17_c"),
  avg("AU20_c"),
  avg("AU23_c"),
  avg("AU25_c"),
  avg("AU26_c"),
  avg("AU28_c"),
  avg("AU45_c"),
  FLOOR(timestamp / resolution) as grouped_seconds,
  avg("success"),
  min("topic") as topic,
  avg("pitch"),
  avg("intensity"),
  bool_and("silence")
from
  data d inner join videos v
on d.video = v.id
where
  timestamp >= start_time
  AND timestamp < end_time
  AND v.hash = hash
group by
  grouped_seconds
order by min(timestamp);
$function$;
