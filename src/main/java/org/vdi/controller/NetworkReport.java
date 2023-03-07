package org.vdi.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class NetworkReport {


    // Calculating the number of weeks in a year
    public int numberOfWeek() {
        LocalDateTime today = LocalDateTime.now();
        int year = today.getYear();
        LocalDate firstDayOfYear = LocalDate.of(year, 0, 1);
        long daySinceFirstDayOfYear = ChronoUnit.DAYS.between(firstDayOfYear, today);
        int numberOfWeeks = (int) Math.ceil(daySinceFirstDayOfYear / 7.0);
        return numberOfWeeks;
    }


}
